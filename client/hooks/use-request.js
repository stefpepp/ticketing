import { useCallback, useState, useReducer, useEffect, useMemo } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, fields }) => {
  const [errors, setErrors] = useState(null);
  // Make initial state
  const getInitialErrorState = useCallback(() => {
    const initialState = {};
    fields &&
      fields.forEach((field) => {
        initialState[field] = { error: "" };
      });
    initialState.general = { error: "" };
    return initialState;
  }, [fields]);

  const formReducer = (state, action) => {
    if (action.type === "EMAIL_ERROR") {
      return { ...state, email: { error: action.payload } };
    }
    if (action.type === "PASSWORD_ERROR") {
      return { ...state, password: { error: action.payload } };
    }
    if (action.type === "GENERAL_ERROR") {
      return { ...state, general: { error: action.payload } };
    }
    if (action.type === "INIT_ERROR") {
      return getInitialErrorState();
    }
    return state;
  };

  const [errorState, dispatch] = useReducer(
    formReducer,
    getInitialErrorState()
  );

  // Fill reducers state with errors, if there is any
  useEffect(() => {
    errors &&
      errors.forEach((err) => {
        if (err.field) {
          dispatch({
            type: `${err.field.toUpperCase()}_ERROR`,
            payload: err.message,
          });
        } else {
          dispatch({
            type: "GENERAL_ERROR",
            payload: err.message,
          });
        }
      });
  }, [errors]);

  const doRequest = async () => {
    setErrors(null);
    dispatch({
      type: "INIT_ERROR",
    });
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      const response = await error.response;
      setErrors(response.data.errors);
    }
  };

  return { doRequest, errorState };
};

export default useRequest;
