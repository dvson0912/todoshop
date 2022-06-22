import Posts from "../../FakeData/Posts";
const initialState = {
  Posts: Posts,
};

const PostsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 1:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default PostsReducer;
