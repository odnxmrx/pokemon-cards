import BackButton from '../BackButton/BackButton';
import style from './About.module.css';

const About = () => {

    return (
        <div className={style.aboutContainer}>
            <BackButton />
            <p>Hola</p>
        </div>
    )
}

export default About;