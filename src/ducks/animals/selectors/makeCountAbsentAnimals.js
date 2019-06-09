import { createSelector } from "reselect";
import getAnimals from "./getAnimals";

function makeCountAbsentAnimals() {
  return createSelector(
    getAnimals,
    animals => animals.length
  );
}

export default makeCountAbsentAnimals;
