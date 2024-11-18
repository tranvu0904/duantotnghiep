import React, { memo } from "react";
import icons from "../utils/icons";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const formatContent = () => {
    const oodEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oodEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index),
      };
    });
    return formatContent;
  };

  const handleFilterPosts = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
    // dispatch(actions.getPostsLimit({ [type]: code }));
  };

  return (
    <div className="p-4 rounded-md bg-white w-full ">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {!isDouble && (
        <div className="flex flex-col gap-1 ">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex items-center gap-1 cursor-pointer hover:text-orange-600 border-b border-dashed pb-1 border-gray-200"
                >
                  <GrNext size={10} />
                  <h4>{item.value}</h4>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-1 ">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-around">
                    <div
                      onClick={() => handleFilterPosts(item.left.code)}
                      className="flex flex-1 items-center gap-1 cursor-pointer hover:text-orange-600 border-b border-dashed pb-1 border-gray-200"
                    >
                      <GrNext size={10} />
                      <h4>{item.left.value}</h4>
                    </div>
                    <div
                      onClick={() => handleFilterPosts(item.right.code)}
                      className="flex flex-1 items-center gap-1 cursor-pointer hover:text-orange-600 border-b border-dashed pb-1 border-gray-200"
                    >
                      <GrNext size={10} />
                      <h4>{item.right.value}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
