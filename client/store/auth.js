import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const LOG_OUT = "LOG_OUT";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const logOut = () => ({ type: LOG_OUT, auth: {} });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fbToken = await user.getIdToken();
        const res = await axios.get("/auth/me", {
          headers: {
            authorization: fbToken,
          },
        });
        return dispatch(setAuth(res.data));
      }
      return dispatch(setAuth({}));
    });
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const auth = getAuth();
    if (method === "login") {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const res = await axios.post(`/auth/${method}`, {
        uid: userCredential.user.uid,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
    } else {
      const res = await axios.post(`/auth/${method}`, { email, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      await signInWithCustomToken(auth, res.data.token);
    }

    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    window.localStorage.removeItem(TOKEN);
    const auth = getAuth();
    await signOut(auth);
    // dispatch(logOut());
    history.push("/login");
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function (state = { id: 2 }, action) {
  switch (action.type) {
    case SET_AUTH:
    case LOG_OUT:
      return action.auth;
    default:
      return state;
  }
}
