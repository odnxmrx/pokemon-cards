import { useState } from "react";
import PostPerPage from "../PostsPerPage/PostPerPage";

function NavigateBtn({page, setPage, allPokemonsLength}) {

    // const [goPage, setGoPage] = useState('');

    // function handleChange(event) {
    //     setGoPage(event.target.value);
    // }

    // //Enter key down listenerv
    // function handleKeyDown(event) {
    //     if (event.key === 'Enter') {
    //         props.setPage(goPage);
    //     };
    // };

    //condicion para desabilitar botones
    const prevBtnDisabled = page === 0; //|| props.allPokemonsLength < 3;
    // console.log(props.allPokemonsLength);
    const nextBtnDisabled = allPokemonsLength < 12; //si se muestran menos que '9'

    const spanStyle = {
        marginLeft: 'auto',
        // display: 'flex',
    }

    return (
        <div style={spanStyle}>
            <span>Page {page}</span>
            <button onClick={() => setPage(Number(page) - 1)} disabled={prevBtnDisabled}>&lt; Page {Number(page) <= 0 ? 0 : Number(page) - 1}</button>
            <button onClick={() => setPage(Number(page) + 1)} disabled={nextBtnDisabled}>Page {Number(page) + 1} &gt;</button>
            <br />
            {/* <PostPerPage pageSize={props.pageSize} setPageSize={props.setPageSize} /> */}
        </div>
    )
}

export default NavigateBtn;