import { useState } from "react";
import NavigateBtn from "../NavigateBtn/NavigateBtn";

export default function GoToPage(props) {

    const [goPage, setGoPage] = useState('');

    function handleChange(event) {
        setGoPage(event.target.value);
    }

    //Enter key down listenerv
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            props.setPage(goPage);
        };
    };

    function handleSubmit(event) {
        event.preventDefault();
        props.setPage(goPage);
    }

    return (
        <span>
            <label htmlFor="">Go to page:<br />
                <input type="search" name="goPage" value={goPage} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Enter page" />
            </label>
            <button onClick={handleSubmit}>Go</button>
        </span>
    )
}