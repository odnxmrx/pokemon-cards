import style from './NavigateBtn.module.css';

function NavigateBtn({ page, setPage, allPokemonsLength }) {

    //condicion para desabilitar botones
    const prevBtnDisabled = page === 0; //|| props.allPokemonsLength < 3;
    
    const nextBtnDisabled = allPokemonsLength < 12; //si se muestran menos que '9'

    return (
        <div className={style.navigateContainer}>
            {
                Number(page) > 0 && <button className={style.navBtn} onClick={() => setPage(Number(page) - 1)} disabled={prevBtnDisabled}>&lt; Page {Number(page) <= 0 ? '' : Number(page) - 1}</button>
            }
            <small>{Number(page) <= 0 ? '' : `Page ${page}`}</small>
            <button className={style.navBtn} onClick={() => setPage(Number(page) + 1)} disabled={nextBtnDisabled}>Page {Number(page) + 1} &gt;</button>
            <br />
        </div>
    )
}

export default NavigateBtn;