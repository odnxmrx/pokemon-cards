import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, cleanDetail } from "../../redux/actions";

const Detail = () => {
    
    const { id } = useParams(); //obtener params.id = 'name' (de la ruta)
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);

    useEffect(() => {
        dispatch(getPokemonDetail(id)); //componentDidMount
        return () => dispatch(cleanDetail()) //al desmontaje, limpiar el estado
    }, [id]) //observar cambios en id

    console.log('que hay en types', pokemonDetail.types);
    const pokemonTypes = pokemonDetail?.types?.map((type, i) => {
        return (<div key={i}>{type?.name} </div>)
    })

    return(
        <div>
            <h3>{pokemonDetail?.name}</h3>
            <p>HP: {pokemonDetail?.id}</p>
            <p>{pokemonDetail?.hp}</p>
            <p>{pokemonDetail?.attack}</p>
            <p>{pokemonDetail?.defense}</p>
            <p>Speed: {pokemonDetail?.speed}</p>
            <div>Type: {pokemonTypes}</div>
            <img src={pokemonDetail?.image} alt="pokemon pic" />
        </div>
    )
}

export default Detail;