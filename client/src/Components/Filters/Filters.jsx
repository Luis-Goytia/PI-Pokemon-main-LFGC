import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHome,
  filterByType,
  filterCreated,
  getAllPokemons,
  getTypes,
  orderByAttack,
  orderByName,
} from "../../Redux/actions/actions";
import "./Filters.css"

export default function Filters() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (types.length < 1) dispatch(getTypes());
  }, [dispatch, types]);
    

  function handleType(e) {
    dispatch(filterByType(e.target.value));
    e.preventDefault();
 
  }
  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
   
  }
  function handleName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    
  }
  function handleAttack(e) {
    e.preventDefault();

    dispatch(orderByAttack(e.target.value));
    
  }
  function handleClear(e) {
    e.preventDefault();
    dispatch(getAllPokemons())
    dispatch(clearHome());
  }


  return (
    <div className="filters">
      <button className="button-clear" onClick={handleClear}>
        Clear filters
      </button>
      <div>
        <h3>Filter By:</h3>
        <select className="selection" onChange={handleCreated}>
          <option value="All">All</option>
          <option value="Created">Created</option>
        </select>
        <select className="selection" onChange={handleType}>
          <option value="All">All</option>
          {types?.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Sort By:</h3>
        <select className="selection" onChange={handleName}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className="selection" onChange={handleAttack}>
          <option value="Lower">Lower</option>
          <option value="Higher">Higher</option>
        </select>
      </div>
      
    </div>
  );
}
