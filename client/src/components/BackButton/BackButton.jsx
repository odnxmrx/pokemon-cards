import { useNavigate } from 'react-router-dom';
import style from './BackButton.module.css';

export default function BackButton (){

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(-1);
    }
    return(
        <button className={style.backBtn} onClick={handleNavigate}>Go back</button>
    )
}