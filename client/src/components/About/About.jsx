import BackButton from '../BackButton/BackButton';
import style from './About.module.css';
import pokemonlogo from '../../assets/pokemon-logo-full-color.svg';

const About = () => {

    return (
        <div className={style.aboutContainer}>
            <BackButton />
            <div className={style.leftContainer}>
                <h2>About</h2>
                <p>
                    Implementations:
                    <br />
                    React - Vite | React - Redux | Router DOM | Sequelize | Postgres | HTML5 | CSS3 | ES6
                </p>
                <br />
                <small>Developed by</small>
                <h3>Armando Pineda Gama</h3>
                <p><em>Full-Stack Developer</em></p>
            </div>
            <div className={style.rightContainer}>
                <img className={style.pokemonLogo} src={pokemonlogo} alt="Pokémon logo" />
            </div>

        </div>
    )
}

export default About;