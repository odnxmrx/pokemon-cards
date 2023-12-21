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
            <label for="input"> Search Pokémon: <br />
                <input type='search' name='input' id='input' placeholder="Pokémon name" value={name} onChange={handleChange} onKeyDown={handleKeyDown} />
            </label>
            {/* <button onClick={() => { mySearch(name) }}>Search</button> */}
        </div>
    )
}

export default Searchbar;
