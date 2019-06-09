import { createSelector } from "reselect";
import getAnimals from "./getAnimals";

function getPropName(state, { name }) {
  return name;
}
