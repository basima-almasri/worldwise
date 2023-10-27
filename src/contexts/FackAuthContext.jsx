import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  authentication: false,
};

function AuthProvider({ children }) {
  function reducer(state, action) {
    const reducerObj = {
      logIn: { ...state, authentication: true, user: action.payload },
      logOut: { ...state, authentication: false, user: null },
    };
    return reducerObj[action?.type];
  }
  const [{ user, authentication }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  function logIn(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "logIn", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "logOut" });
  }

  return (
    <AuthContext.Provider value={{ user, authentication, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined) throw new Error("There is an error");
  return auth;
}

export { useAuth, AuthProvider };
