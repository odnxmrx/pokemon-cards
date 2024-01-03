import style from './Footer.module.css';
import pokemonlogo from '../../assets/pokemon-logo-full-color.svg';
import githublogo from '../../assets/icons8-github.svg';

export default function Footer() {

    return (
        <div className={style.myFooter}>
            <div className={style.leftContainer}>
                <span>Developed with 💛 by Armando Gama @ 2024</span>
                <br />
                <a href="https://github.com/odnxmrx" target='_blank'>
                    <img src={githublogo} alt="GitHub logo" /> Visit GitHub 
                </a>
            </div>
            <div>
                <img className={style.pokemonLogo} src={pokemonlogo} alt="Pokémon logo" />
            </div>
        </div>
    )
}