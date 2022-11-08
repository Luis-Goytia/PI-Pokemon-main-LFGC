import { React, useEffect } from "react";
import {useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { getAllPokemons, getNamePokemon } from "../../Redux/actions/actions";
import Cards from "../Home/Cards";
import NotPokemons from "../ToolComponents/NotPokemons";

export default function SearchPokemon() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (name) dispatch(getNamePokemon(name));
    return () => {
      dispatch(getAllPokemons());
    };
  }, [dispatch, name]);


  if (pokemons) {
    return (
      <>
        <NavBar />
        <Cards data={pokemons} />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <NotPokemons />
      </>
    );
  }
}
