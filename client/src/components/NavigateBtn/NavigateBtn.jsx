import style from './NavigateBtn.module.css';

function NavigateBtn({ page, setPage, allPokemonsLength }) {

    //condicion para desabilitar botones
    const prevBtnDisabled = page === 0; //|| props.allPokemonsLength < 3;
    const nextBtnDisabled = allPokemonsLength < 12; //si se muestran menos que '12'

    return (
        <div className={style.navigateContainer}>
            <small>{Number(page) <= 0 ? '' : `Page ${page}`}</small><br />
            {
                Number(page) > 0 && <button className={style.navBtn} onClick={() => setPage(Number(page) - 1)} disabled={prevBtnDisabled}>← Page {Number(page) <= 0 ? '' : Number(page) - 1}</button>
            }
            <button className={style.navBtn} onClick={() => setPage(Number(page) + 1)} disabled={nextBtnDisabled}>Page {Number(page) + 1} →</button>
            <br />
        </div>
    )
}

export default NavigateBtn;