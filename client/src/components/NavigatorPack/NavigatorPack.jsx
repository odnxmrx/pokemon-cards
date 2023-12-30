import GoToPage from "../GoToPage/GoToPage";
import NavigateBtn from "../NavigateBtn/NavigateBtn";
import PostPerPage from "../PostsPerPage/PostPerPage";
import style from './NavigatorPack.module.css';


const NavigatorPack = ({ page, pageSize, setPageSize, setPage, allPokemonsLength }) => {

    return (
        <div className={style.navigatorContainer}>
            <PostPerPage pageSize={pageSize} setPageSize={setPageSize} />
            <GoToPage setPage={setPage} />
            <NavigateBtn page={page} setPage={setPage} allPokemonsLength={allPokemonsLength} />
        </div>
    )
}

export default NavigatorPack;