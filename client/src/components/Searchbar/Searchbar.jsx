import { useState } from 'react';

const Searchbar = ({ onSearch }) => {

    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    //Enter key down listenerv
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            mySearch();
        };
    };

    const mySearch = () => {
        onSearch(name);
        setName('');
    }

    return (
        <div>
            <p>Search by name</p>
            <input type='search' name='input' placeholder="Search Pokémon" value={name} onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={() => { mySearch(name) }}>Search</button>
        </div>
    )
}

export default Searchbar;
