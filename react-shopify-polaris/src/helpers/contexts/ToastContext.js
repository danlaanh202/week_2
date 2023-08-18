import React, { createContext, useReducer } from "react";

const initialState = {
  activeToast: false,
  content: "Something went wrong",
};

export const Context = createContext(initialState);

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "TOGGLE_TOAST":
        return {
          ...state,
          activeToast: !state.activeToast,
        };
      case "SET_CONTENT":
        return { ...state, content: action.payload.content };

      default:
        return state;
    }
  }, initialState);
  const toggleToast = () => {
    dispatch({
      type: "TOGGLE_TOAST",
    });
  };
  const setContent = (content) => {
    dispatch({
      type: "SET_CONTENT",
      payload: {
        content,
      },
    });
  };
  const showToast = (content) => {
    setContent(content);
    toggleToast();
  };

  return (
    <Context.Provider value={{ toggleToast, showToast, toastState: state }}>
      {children}
    </Context.Provider>
  );
};
