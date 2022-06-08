import {
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  CLEAR_FAVORITE,
} from "../constants";

const favoriteItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITE:
      return state.filter((favoriteItem) => favoriteItem !== action.payload);
    case CLEAR_FAVORITE:
      return (state = []);
  }
  return state;
};

export default favoriteItems;
