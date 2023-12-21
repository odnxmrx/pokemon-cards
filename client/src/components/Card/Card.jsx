import { Link } from 'react-router-dom';
import style from './Card.module.css'
import getColor from './colors.js'

function Card({ id, name, image, hp, attack, types }) {

    // console.log(types[0].name);
    let myColor = getColor(types[0].name);
    // console.log('que obtuve??? ', myColor);
    const bgColorByType = {
        backgroundColor: myColor + 20 //'20' alpha (transparency)
    }

    return (
        <div key={{ id }} className={style.cardContainer} id='card' style={bgColorByType}>
            <div className={style.cardTitle}>

                <Link to={`/pokemon/${id}`}>
                    <p>{name}</p>
                </Link>
                <span className={style.roundCircle}>#{id}</span>
            </div>
            <div className={style.moreInfo}>

                <div className={style.leftContainer}>

                    <ul>
                        <li>
                            <label for="hp">
                                <span>HP</span><span>{hp}</span>
                            </label>
                            <meter id="hp" min="0" max="255" low="63" high="191" optimum="127" value={hp}>{hp}</meter>

                        </li>

                        <li>
                            <label for="attack">
                                <span>Attack</span><span>{attack}</span>
                            </label>
                            <meter id="attack" min="0" max="180" low="45" high="135" optimum="90" value={attack}>{attack}</meter>

                        </li>

                        <li>
                            <br /><span>Type:</span>
                            {
                                types?.map((type, i) => {
                                    // iterar cada posible tipo
                                    return (
                                        <span className={style.roundCircle} key={i}>
                                            {type.name}
                                        </span>
                                    )
                                })
                            }
                        </li>
                    </ul>



                    <br />

                </div>
                <div className={style.rightContainer}>
                    <img src={image} alt={`${name} image`} />
                </div>
            </div>
        </div>
    )
}

export default Card;