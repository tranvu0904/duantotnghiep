import { PiNutFill } from "react-icons/pi";
import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  outStandingPosts: [],
  postOfCurrent: [],
  dataEdit: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
      case actionTypes.GET_OUTSTANDING:
      return {
        ...state,
        outStandingPosts: action.outStandingPosts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_POSTS_ADMIN:
      return {
        ...state,
        postOfCurrent: action.posts || [],
        msg: action.msg || "",
      };

    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };
      case actionTypes.RESET_DATA_EDIT:
      return {
        ...state,
        dataEdit: null,
      };
    default:
      return state;
  }
};

export default postReducer;
