import { SET_NAME } from '../actions';

export default (state = 'Hoboken', action) => {
  switch (action.type) {
    case SET_NAME:
      //return action.name;
    default:
      return state;
  }
};
