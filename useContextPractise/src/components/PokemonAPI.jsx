import { useState, useEffect } from 'react';

async function getPokemonList(limit = 10000, offset = 0) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();

  return data.results.map(p => {
    const id = p.url.split('/').filter(Boolean).pop();
    return {
      id: Number(id),
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      types: []
    };
  });
}

export default function PokemonAPI() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameSearch, setNameSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');

    useEffect(() => {
        getPokemonList().then(list => {
            // Fetch types for each Pokemon
            Promise.all(list.map(async pokemon => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
                const data = await res.json();
                return {
                    ...pokemon,
                    types: data.types
                };
            })).then(fullList => {
                setPokemonList(fullList);
                setLoading(false);
            });
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const nameQ = nameSearch.trim().toLowerCase();
    const typeQ = typeSearch.trim().toLowerCase();

    const filteredList = pokemonList.filter(pokemon => {
        const nameMatch = !nameQ || pokemon.name.toLowerCase().includes(nameQ);
        const typeMatch = !typeQ || pokemon.types?.some(t =>
            t.type.name.toLowerCase().includes(typeQ)
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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
            }}>
                {filteredList.map(pokemon => (
                    <div key={pokemon.id}>
                        <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
                        <div>{pokemon.name}</div>
                        <div>ID: {pokemon.id}</div>
                        <div>Types: {pokemon.types?.map(t => t.type.name).join(', ')}</div>
                    </div>
                ))}
            </div>

            {filteredList.length === 0 && (
                <div>No Pokémon match your search</div>
            )}
        </div>
    );
}
