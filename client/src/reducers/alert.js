import { SET_ALERT, REMOVE_ALERT } from "../action/types";
const initalState = [];

export default function (state = initalState, action) {
  const { type, payload } = action;
  //action.type//action.payload
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT: //remove a specific alert by its ID.
      return state.filter((alert) => alert.id !== payload); // in this case of action payload is id !rem different different payload for different cases
    default:
      return state;
  }
}
