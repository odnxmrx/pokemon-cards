
export function validatePokemon(newPokemon) {
    const errors = {};

    //name validator
    if(!/^[a-z\-]*$/.test(newPokemon.name)) {
        errors.name = 'Name must be lowercase letters only.'
    }
    if(!newPokemon.name) {
        errors.name = 'A name must be given.'
    }
    if(newPokemon.name.length < 3) {
        errors.name = 'Name must be at least 3 characters long.'
    }
    if(newPokemon.name.length > 30) {
        errors.name = 'Name must be up to 30 characters long.'
    }

    //hp
    if(newPokemon.hp <= 0) {
        errors.hp = 'HP value must be greater than 0.'
    } 
    if(newPokemon.hp > 255) {
        errors.hp = 'HP value must be less than 255.'
    }

    //attack
    if(newPokemon.attack <=0) {
        errors.attack = 'Attack value must be greater than 0.'
    }
    if(newPokemon.attack > 180) {
        errors.attack = 'Attack value must be less than 180.'
    }

    //defense
    if(newPokemon.defense <= 0) {
        errors.defense = 'Defense value must be greater than 0.'
    }
    if(newPokemon.defense > 230) {
        errors.defense = 'Defense value must be less than 230.'
    }

    //speed
    if(newPokemon.speed <= 0) {
        errors.speed = 'Speed value must be greater than 0.'
    }
    if(newPokemon.speed > 180) {
        errors.speed = 'Speed value must be less than 180.'
    }

    //height
    if(newPokemon.height <= 0) {
        errors.height = 'Height value must be greater than 0.'
    }
    if(newPokemon.height > 20) {
        errors.height = 'Height value must be less than 20.'
    }

    //weight
    if(newPokemon.weight <= 0) {
        errors.weight = 'Weight value must be greater than 0.'
    }
    if(newPokemon.weight > 400) {
        errors.weight = 'Weight value must be less than 400.'
    }
    
    return errors;
}