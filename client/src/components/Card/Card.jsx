import { Link } from 'react-router-dom';

function Card({ id, name, hp, attack, types }) {

    const pokemonTypes = types.map((type, i) => {
        return <span key={i}>{type?.name} </span>
    })

    return (
        <div>
            <hr />
            <h2>{id}</h2>
            <Link to={`/pokemon/${id}`}>
                <h3>{name}</h3>
            </Link>
            <h3>{hp}</h3>
            <p>{attack}</p>
            <div>{pokemonTypes}</div>
        </div>
    )
}

export default Card;