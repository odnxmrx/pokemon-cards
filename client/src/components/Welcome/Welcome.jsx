import { useNavigate } from "react-router-dom";
import pokemonintrovideo from '../../assets/opening-pokemon-t1-latino.mp4'
import style from './Welcome.module.css';

const Welcome = () => {
    const navigate = useNavigate();


    function playPauseBtn() {
        if (video.paused) {
            video.play();
            // btn.innerHTML = "Pause";
          } else {
            video.pause();
            // btn.innerHTML = "Play";
          }
    }

    return (
        <div>
            <video autoPlay muted loop id={style.myVideo}>
                <source src={pokemonintrovideo} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div className={style.contentW}>

                <h1>PokéApp</h1>
                <p>Welcome to my Pokémon App. Here you'll find all things Pokémon. <br />Chatch 'em all! or create your own!</p>
                <button onClick={() => navigate('/home')}>Enter →</button>
            {/* <button onClick={()=> playPauseBtn()}>Play/Pause</button> */}
            </div>
        </div>
    )
}

export default Welcome;