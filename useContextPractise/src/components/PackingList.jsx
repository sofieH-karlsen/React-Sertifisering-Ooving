import { useState } from 'react';

const initialItems = [
    { id: 1, name: 'Item 1', packed: true },
    { id: 2, name: 'Item 2', packed: false },
    { id: 3, name: 'Item 3', packed: false }
];

export default function PackingList() {
    const [items, setItems] = useState([...initialItems]);

    const togglePacked = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
    }

    return (
        <>
        <section >
            <h2>Packing List</h2>
            <AddItem setItems={setItems} items={items} />
            <ItemsList items={items} setItems={setItems} togglePacked={togglePacked} />
        </section>
        </>
    );
}

function AddItem({ setItems, items }){
    const [name, setName] = useState('');

    const add = () =>{
        const id = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
        setItems([...items, { id, name:name || `Item ${id}`, packed: false }]);
        setName('');
    }

    return (
        <div >
            <input  type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button  onClick={add}>Add</button>
        </div>
    )
}

function ItemsList({ items, setItems, togglePacked }){
    return (
        <ul
            style={{
                listStyle: "none",
                padding: "1rem",
                margin: 0,
                width: "200px",
                height: "200px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            {items.map(item => (
                <li  key={item.id}>
                   <input type="checkbox" checked={item.packed} onChange={() => {togglePacked(item.id)}} />
                    <span data-packed={item.packed}>{item.name}</span>
                    <button  onClick={() =>{setItems(items.filter(i => i.id !== item.id))} }>Remove</button>
                </li>
            ))}
        </ul>
    );
}
