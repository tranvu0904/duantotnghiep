import React, { useEffect, useState } from "react";
import { Item } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions/post";
import { useSearchParams } from "react-router-dom";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });

    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    if (sort === 1) searchParamsObject.order = ["createdAt", "DESC"];
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode, sort]); 

  return (
    <div className="w-full bg-white shadow-md rounded-md px-4 ">
      <div className="flex items-center justify-between mt-5 px-1">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        {/* <span>Cập nhật : 12/04/2024</span> */}
      </div>
      <div className="flex items-center gap-2 my-2 px-1">
        <span>Sắp xếp:</span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 0 && "text-red-500"
          }`}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 1 && "text-red-500"
          }`}
        >
          Mới nhất
        </span>
      </div>

      <div className="items-center ">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={item?.description}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
