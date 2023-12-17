import { useState } from "react";


function NavigateBtn(props) {

    const [goPage, setGoPage] = useState('');

    function handleChange(event) {
        setGoPage(event.target.value);
    }

    //condicion para desabilitar botones
    const prevBtnDisabled = props.page === 0; //|| props.allPokemonsLength < 3;
    // console.log(props.allPokemonsLength);
    const nextBtnDisabled = props.allPokemonsLength < 12; //si se muestran menos que '9'

    return (
        <header>
            <p>Page {props.page}</p>
            <button onClick={() => props.setPage(Number(props.page) - 1)} disabled={prevBtnDisabled}>Page {Number(props.page) <= 0 ? 0 : Number(props.page) - 1}</button>
            <button onClick={() => props.setPage(Number(props.page) + 1)} disabled={nextBtnDisabled}>Page {Number(props.page) + 1}</button>
            <br />
            <label htmlFor="">Go to page:
                <input type="search" name="goPage" value={goPage} onChange={handleChange} placeholder="Enter page" />
            </label>
            <button onClick={() => { props.setPage(goPage) }}>Go</button>
        </header>
    )
}

export default NavigateBtn;