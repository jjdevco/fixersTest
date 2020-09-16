import React, { createContext, useContext, useReducer } from "react";

import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "./types";

export const Context = createContext({
  notifications: [],
});

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: payload.key,
            ...payload,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          payload.dismissAll || notification.key === payload.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== payload.key
        ),
      };

    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;
  const newKey = () =>
    `${new Date().getTime()}_${Math.floor(Math.random() * 999999999)}`;

  return {
    type: ENQUEUE_SNACKBAR,
    payload: {
      ...notification,
      key: key || newKey(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  payload: { dismissAll: !key, key },
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  payload: { key },
});
