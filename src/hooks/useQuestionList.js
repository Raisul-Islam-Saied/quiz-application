import { useEffect, useReducer } from "react";
import { getDatabase, query, ref, orderByKey, get } from "firebase/database";
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

const initialValues = {
  isloading: true,
  error: null,
  questions: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        isloading: false,
        error: null,
        questions: [...Object.values(action.payload)],
      };

    case FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
        questions: "",
      };

    default:
      return state;
  }
};

const useQuestionList = (videoId) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    const fatchquestion = async () => {
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoId + "/questions");
      const quizQuary = query(quizRef, orderByKey());
      try {
        const snapshot = await get(quizQuary);
        if (snapshot.exists() && snapshot.val().length > 0) {
          dispatch({ type: SUCCESS, payload: snapshot.val() });
        } else {
          dispatch({ type: FAILED, payload: "failed to fetch" });
        }
      } catch (error) {
        dispatch({ type: FAILED, payload: error });
      }
    };

    fatchquestion();
  }, [videoId]);
  const { isloading, error, questions } = state;
  return { isloading, error, questions };
};
export default useQuestionList;
