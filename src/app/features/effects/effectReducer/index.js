const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      if (state[action.payload.param]) {
        const s = Object.assign({}, state);
        s[action.payload.param] = action.payload.value;
        return s;
      }
      return state;
    default:
      throw new Error();
  }
};

export default reducer;
