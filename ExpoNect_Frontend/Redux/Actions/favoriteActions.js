import {
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  CLEAR_FAVORITE,
} from "../constants";

export const addToFavorite = (payload) => {
  return {
    type: ADD_TO_FAVORITE,
    payload,
  };
};

export const removeFromFavorite = (payload) => {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload,
  };
};

export const clearFavorite = () => {
  return {
    type: CLEAR_FAVORITE,
  };
};
