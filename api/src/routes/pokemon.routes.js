const { Router } = require("express");
const {
  getAllPokemonsAPI,
  getAllPokemonsDB,
  getPokemonById,
  getPokemonByName,
} = require("../controllers/pokemonController/getController");
const {
  postPokemon,
} = require("../controllers/pokemonController/postController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemon = await getPokemonByName(name);
      //console.log("In route", pokemon);
      if (pokemon) {
        return res.status(202).send(pokemon);
      } else {
        return res.status(404).send(`No existe el pokemon ${name}`);
      }
    }
    const pokemonsAPI = await getAllPokemonsAPI();
    const pokemonsDB = await getAllPokemonsDB();
    const pokemons = [...pokemonsDB, ...pokemonsAPI];

    if (pokemons.length > 0) {
      return res.status(202).send(pokemons);
    } else {
      return res.status(404).send(`No secargaron los pokemons`);
    }
  } catch (error) {
    return res.status(404).send(`${error} No secargaron los types in db`);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const pokemon = await getPokemonById(id);
      
      if (pokemon) {
        console.log("En route", pokemon);
        return res.status(202).send(pokemon);
      } else {
        return res.status(404).send(`No existe el pokemon con id= ${id}`);
      }
    }
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  //Verification of data
  const { name, hp, attack, defense, speed, height, weight, types, img } =
    req.body;
  if (
    !name ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !height ||
    !weight ||
    !types ||
    !img
  )
    return res.status(500).send({ error: "Wrong data" });

  //Verification si existe 
  const checkPokemon = async (name) => {
    try {
      const pokemon = await getPokemonByName(name);
      console.log("encontrado",pokemon);
      if (pokemon)
        return "Pokemon already exists";
    } catch (error) {
      return null;
    }
  };

  let result = await checkPokemon(name);
  if (result) {
    return res.status(500).send(result);
  }
  
  try {
    let pokemon = await postPokemon(
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      img
    );
    if (pokemon) {
      return res.status(202).send(pokemon);
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError")
      return res.status(500).send("Pokemon already exists.");
    return res.status(404).send(`No se creo el pokemon ${name} Erro ${error}`);
  }
});

module.exports = router;
