import { useState, useEffect } from 'react';

async function getJson(url) {
    const res = await fetch(url);
    return res.json();
}

async function getPokemonList(limit = 151, offset = 0) {
    const data = await getJson(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    return data.results.map(p => {
        const id = p.url.split('/').filter(Boolean).pop();
        return {
            id: Number(id),
            name: p.name,
            image: null,
            types: [],
            forms: []
        };
    });
}

async function getPokemonWithForms(pokemon) {
    // Base Pokémon data (types, sprite)
    const data = await getJson(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);

    // Species data lists every variety (base + alternate forms)
    const species = await getJson(data.species.url);

    const formUrls = species.varieties
        .filter(v => !v.is_default) // skip the base Pokémon itself
        .map(v => v.pokemon.url);

    const forms = (
        await Promise.all(
            formUrls.map(async url => {
                const f = await getJson(url);
                return {
                    id: f.id,
                    name: f.name,
                    image: f.sprites.front_default,
                    types: f.types
                };
            })
        )
    ).filter(f => f.image); // drop forms without a sprite

    return {
        ...pokemon,
        image: data.sprites.front_default,
        types: data.types,
        forms
    };
}

export default function PokemonAPI() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameSearch, setNameSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');

    useEffect(() => {
        getPokemonList()
            .then(list => Promise.all(list.map(getPokemonWithForms)))
            .then(fullList => {
                setPokemonList(fullList.filter(p => p.image)); // hide those without an image
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const nameQ = nameSearch.trim().toLowerCase();
    const typeQ = typeSearch.trim().toLowerCase();

    const filteredList = pokemonList.filter(pokemon => {
        const all = [pokemon, ...pokemon.forms];

        const nameMatch =
            !nameQ || all.some(p => p.name.toLowerCase().includes(nameQ));

        const typeMatch =
            !typeQ ||
            all.some(p =>
                p.types?.some(t => t.type.name.toLowerCase().includes(typeQ))
            );

        return nameMatch && typeMatch;
    });

    return (
        <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={nameSearch}
                    onChange={e => setNameSearch(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        width: '100%',
                        maxWidth: '250px',
                        boxSizing: 'border-box'
                    }}
                />
                <input
                    type="text"
                    placeholder="Search by type..."
                    value={typeSearch}
                    onChange={e => setTypeSearch(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        width: '100%',
                        maxWidth: '250px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                }}
            >
                {filteredList.map(pokemon => (
                    <div key={pokemon.id} style={{ border: '1px solid #ccc', padding: '8px', margin: '4px' }}>
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                        />
                        <div>{pokemon.name}</div>
                        <div>ID: {pokemon.id}</div>
                        <div>
                            Types: {pokemon.types?.map(t => t.type.name).join(', ')}
                        </div>

                        {pokemon.forms.length > 0 && (
                            <div>
                                {pokemon.forms.map(form => (
                                    <img
                                        key={form.id}
                                        src={form.image}
                                        alt={form.name}
                                        title={form.name}
                                        width={70}
                                        height={70}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filteredList.length === 0 && (
                <div>No Pokémon match your search</div>
            )}
        </div>
    );
}