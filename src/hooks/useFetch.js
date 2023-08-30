import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  isloading: true,
  error: null,
  result: null,
};
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        isloading: false,
        error: null,
        result: action.payload,
      };
    case FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
        result: "",
      };

    default:
      return state;
  }
};

const useFetch = (url, method = "GET", authorization) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      await axios[method](url, { headers: { Authorization: authorization } })
        .then((res) => dispatch({ type: SUCCESS, payload: res.data }))
        .catch((err) => dispatch({ type: FAILED, payload: err.message }));
    };
    fetchData();
  }, [url, method, authorization]);
  const { isloading, error, result } = state;
  return { isloading, error, result };
};
export default useFetch;
