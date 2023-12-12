import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, cleanDetail } from "../../redux/actions";

const Detail = () => {
    
    const { id } = useParams(); //obtener params.id = 'name' (de la ruta)
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);

    console.log(pokemonDetail);
    // const [pokemonDetail, setPokemonDetail] = useState({});

    useEffect(() => {
        dispatch(getPokemonDetail(id)); //componentDidMount
        return () => dispatch(cleanDetail()) //al desmontaje, limpiar el estado
    }, [id]) //observar cambios en id

    const pokemonTypes = pokemonDetail?.types?.map((type, i) => {
        return <span key={i}>{type?.name} </span>
    })

    return(
        <div>
            <h3>{pokemonDetail?.name}</h3>
            <p>{pokemonDetail?.id}</p>
            <p>{pokemonDetail?.hp}</p>
            <p>{pokemonDetail?.attack}</p>
            <p>{pokemonDetail?.defense}</p>
            <p>{pokemonDetail?.speed}</p>
            <div>{pokemonTypes}</div>
            <img src={pokemonDetail?.image} alt="pokemon pic" />
        </div>
    )
}

export default Detail;