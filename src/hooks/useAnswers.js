import { useEffect, useReducer } from "react";
import { getDatabase, query, ref, orderByKey, get } from "firebase/database";
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

const initialValues = {
  isloading: true,
  error: null,
  answers: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        isloading: false,
        error: null,
        answers: [...Object.values(action.payload)],
      };

    case FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload || "failed",
        answers: "",
      };

    default:
      return state;
  }
};

const useAnswersList = (videoId) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    const fechAnswers = async () => {
      const db = getDatabase();
      const answersQuary = ref(db, "answers/" + videoId + "/questions");
      const answersRef = query(answersQuary, orderByKey());
      try {
        const snapshot = await get(answersRef);
        if (snapshot.exists() && snapshot.val().length > 0) {
          dispatch({ type: SUCCESS, payload: snapshot.val() });
        } else {
          dispatch({ type: FAILED, payload: "failed to fetch" });
        }
      } catch (error) {
        dispatch({ type: FAILED, payload: error });
      }
    };

    fechAnswers();
  }, [videoId]);
  const { isloading, error, answers } = state;
  return { isloading, error, answers };
};
export default useAnswersList;
