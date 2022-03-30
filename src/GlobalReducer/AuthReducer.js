export default (state, action) => {
  switch (action.type) {
    case "LOAD_TOKEN":
      return {
        ...state,
        secureToken: action.secureToken,
        userData: action.userData,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOADING":
      return { ...state, isLoading: false };

    case "LOAD_USER_DATA":
      return { ...state };

    case "UPDATE_USER_DATA":
      console.log("dispatch", action);
      return { ...state, userData: action.userData };
    default:
      return { ...state };
  }
};
