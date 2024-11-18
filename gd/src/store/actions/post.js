import actionTypes from "./actionTypes";
import {
  apiGetNewPosts,
  apiGetPostLimitAdmin,
  apiGetPosts,
  apiGetPostsLimit,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};

// Lay theo gia,dien tich
export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};
// Lay theo bai dang moi nhat
export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS,
      newPosts: null,
    });
  }
};
// Lay bai ben admin
export const getPostsLimitAdmin = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostLimitAdmin(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        msg: response.data.msg,
        posts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_ADMIN,
      posts: null,
    });
  }
};

// Get post with star
export const getOutStandingPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order: ["star", "DESC"],
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        outStandingPosts: response.data.response?.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        msg: response.data.msg,
        outStandingPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OUTSTANDING,
      outStandingPosts: null,
    });
  }
};

export const editData = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit,
});
export const resetDataEdit = () => ({
  type: actionTypes.RESET_DATA_EDIT,
});
