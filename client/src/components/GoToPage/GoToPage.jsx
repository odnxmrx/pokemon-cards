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

    return (
        <>
            <label htmlFor="">Go to page:
                <input type="search" name="goPage" value={goPage} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Enter page" />
            </label>
            <button onClick={() => { props.setPage(goPage) }}>Go</button>
        </>
    )
}