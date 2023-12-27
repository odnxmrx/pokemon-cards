const mapPokemonObject = (data) => {
  const mappedData = {
    id: data.id,
    name: data.name,
    hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
    attack: data.stats.find((stat) => stat.stat.name === "attack").base_stat,
    defense: data.stats.find((stat) => stat.stat.name === "defense").base_stat,
    speed: data.stats.find((stat) => stat.stat.name === "speed").base_stat,
    height: data.height,
    weight: data.weight,
    // types: data.types.map((type) => type.type.name),
    types: data.types.map((typArr, i) => { //formato igualado a como obtengo de BD
      let pokeTypes = {}
      pokeTypes["name"] = typArr.type.name;
      return pokeTypes;
    }),
    // image: data.sprites.front_default,
    image: data.sprites.other.dream_world.front_default,
  };

  return mappedData;
};

module.exports = mapPokemonObject;
