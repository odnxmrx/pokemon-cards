import { Link } from 'react-router-dom';

function Card({ id, name, image, hp, attack, types }) {
    // const pokemonTypes = types?.map((type, i) => {
    //     return <span key={i}>{type} <br /></span>
    // })

    return (
        <div key={{id}}>
            <hr />
            <h2>{id}</h2>
            <Link to={`/pokemon/${id}`}>
                <h3>{name}</h3>
            </Link>
            <h3>HP: {hp}</h3>
            <p>Attack: {attack}</p>
            <p>Type:</p>
            {
                types?.map((type, i) => { 
                    // iterar cada posible tipo
                    return (
                        <div key={i}>
                            {type.name}
                        </div>
                    )
                })
            }
            <img src={image} alt={`${name} image`} />
        </div>
    )
}

export default Card;