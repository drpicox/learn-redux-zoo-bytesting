import { createSelector } from "reselect";
import getAnimals from "./getAnimals";

function makeGetAnimalsName() {
  function getAnimalsName(state) {
    return getAnimals(state).map(o => o.name);
  }

  return getAnimalsName;
}

export default makeGetAnimalsName;
