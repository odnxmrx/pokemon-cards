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
                <input type="search" inputMode="numeric" maxLength="3" pattern="\d{4,4}" name="goPage" value={goPage} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Enter page #" />
            </label>
            <button onClick={handleSubmit} disabled={!/^[0-9]/.test(goPage)}>Go</button>
        </span>
    )
}