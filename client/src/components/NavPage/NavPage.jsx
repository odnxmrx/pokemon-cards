
function NavPage(props) {

    //condicion para desabilitar botones
    const prevBtnDisabled = props.page === 0; //|| props.allPokemonsLength < 3;
    // console.log(props.allPokemonsLength);
    const nextBtnDisabled = props.allPokemonsLength < 3; //si se muestran menos que '9'

    return(
        <header>
            <p>Page {props.page}</p>
            <button onClick={() => props.setPage(props.page - 1)} disabled={prevBtnDisabled}>Page {props.page <= 0 ? 0 : props.page - 1}</button>
            <button onClick={() => props.setPage(props.page + 1)} disabled={nextBtnDisabled}>Page {props.page + 1}</button>
        </header>
    )
}

export default NavPage;