import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const RelatedPost = ({ newPost }) => {
  const { newPosts, outStandingPosts } = useSelector((state) => state.post);
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStandingPosts());
  }, []);

  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandingPosts);
  }, [newPosts, outStandingPosts]);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">{newPost? 'Tin mới đăng':'Tin nổi bật'}</h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.map((item) => {
          return (
            <Sitem
              key={item?.id}
              title={item?.title}
              price={item?.attributes?.price}
              createdAt={item?.createdAt}
              image={JSON.parse(item.images.image)}
              star={item?.star}
              id={item?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
