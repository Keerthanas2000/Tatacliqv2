const initialState = {
  items: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_to_wishlist":
      if (state.items.find(item => item._id === action.payload._id)) {
        return state; // avoid duplicates
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "remove_from_wishlist":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default wishlistReducer;
