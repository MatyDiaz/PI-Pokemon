const cleanApiArray = (arr) => {
    const clean = arr.map(el=>{
        return {
            name: el.name,
            id:el.id,
            image: el.sprites.other['official-artwork']['front_default'],
            hp: el.stats.find(stat => stat.stat.name === 'hp').base_stat,
            attack: el.stats.find( stat => stat.stat.name === 'attack').base_stat,
            defense: el.stats.find(stat => stat.stat.name === 'defense').base_stat,
            speed: el.stats.find(stat => stat.stat.name === 'speed').base_stat,
            height: el.height,
            weight: el.weight,
            types: el.types.map(type => type.type.name),
            created: false 
        }
    });
    return clean;
}

const cleanDbArray = (arr) => {
   const clean = arr.map(el =>{
        return {
            name: el.name,
            id:el.id,
            image: el.image,
            hp: el.hp,
            attack: el.attack,
            defense: el.defense,
            speed: el.speed,
            height: el.height,
            weight: el.weight,
            types: el.Types.map( el=> el.name ),
            created: el.created 
        }
    });
    return clean;
}

const cleanApiPoke = (poke) => {
    const cleanedPoke = {
        name: poke.name,
        id:poke.id,
        image: poke.sprites.other['official-artwork']['front_default'],
        hp: poke.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: poke.stats.find( stat => stat.stat.name === 'attack').base_stat,
        defense: poke.stats.find(stat => stat.stat.name === 'defense').base_stat,
        speed: poke.stats.find(stat => stat.stat.name === 'speed').base_stat,
        height: poke.height,
        weight: poke.weight,
        types: poke.types.map(el =>el.type.name),
        created: poke.created

    }

    return cleanedPoke
}

const cleanDbPoke = (poke) => {
    return {
        name: poke.name,
        id:poke.id,
        image: poke.image,
        hp: poke.hp,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        height: poke.height,
        weight: poke.weight,
        types: poke.Types.map(el => el.name),
        created: poke.created 
    }
}

const cleanTypesArray = (arr) => {
    const cleanedTypes = arr.map(el => el.name);
    return cleanedTypes;
}

module.exports = {
  cleanApiArray,
  cleanDbArray,
  cleanApiPoke,
  cleanDbPoke,
  cleanTypesArray,
};