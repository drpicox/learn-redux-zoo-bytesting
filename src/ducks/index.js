import { combineReducers } from "redux";

import animals from "./animals";
import name from "./name";
import presenceFilter from "./presenceFilter";

const reduceDucks = combineReducers({ animals, name, presenceFilter });
export default reduceDucks;
