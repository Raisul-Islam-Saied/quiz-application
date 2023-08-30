import { useEffect, useReducer, useState } from "react";
import {
  getDatabase,
  query,
  ref,
  orderByKey,
  get,
  startAt,
  limitToFirst,
} from "firebase/database";
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

const initialValues = {
  isloading: true,
  error: null,
  videos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        isloading: false,
        error: null,
        videos: [...Object.values(action.payload)],
      };

    case FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
        videos: [],
      };

    default:
      return state;
  }
};

const useVideoList = (page) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fatchVideos = async () => {
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      const videoQuary = query(
        videoRef,
        orderByKey(),
        startAt("1"),
        limitToFirst(8 + page)
      );
      try {
        const snapshot = await get(videoQuary);
        if (snapshot.exists()) {
          dispatch({ type: SUCCESS, payload: snapshot.val() });
        } else {
          //
        }
        if (snapshot.val().length === page) {
    
          setHasMore(false);
        }
      } catch (error) {
        dispatch({ type: FAILED, payload: error });
      }
    };

    fatchVideos();
  }, [page, hasMore]);
  const { isloading, error, videos } = state;
  return { isloading, error, videos, hasMore };
};
export default useVideoList;
