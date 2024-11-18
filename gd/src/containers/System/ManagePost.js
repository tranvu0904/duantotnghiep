import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services/post";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('0');


  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);

  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục bài đăng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeletePost(postId);
        if (response?.data.err === 0) {
          setUpdateData((prev) => !prev);
          Swal.fire("Đã xóa!", "Xóa bài đăng thành công!", "info");
        }
      } else {
        Swal.fire("Đã hủy", "Bài đăng của bạn vẫn còn!", "info");
      }
    });
  };

  const handleFilterByStatus = (statusCode) => {
    setStatus(statusCode || '')
    if (statusCode === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (statusCode === 2) {
      const expiredPost = postOfCurrent?.filter(
        (item) => !checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else{
      setPosts(postOfCurrent)
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-12 ">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Quản lí tin đăng</h1>
        <select
          onChange={(e) => handleFilterByStatus(+e.target.value)}
          value={status}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value='0'>Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left font-medium text-gray-700">
              Mã tin
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Ảnh đại diện
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Tiêu đề
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Giá
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Ngày bắt đầu
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Ngày hết hạn
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Trạng thái
            </th>
            <th className="border p-2 text-left font-medium text-gray-700">
              Tuỳ chọn
            </th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>Bạn chưa có bài đăng nào</td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-gray-600">
                    {item?.overviews?.code}
                  </td>
                  <td className="h-full flex justify-center items-center  border-t p-2 text-gray-600">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md "
                    />
                  </td>
                  <td className="border p-2 text-gray-600">{item?.title}</td>
                  <td className="border p-2 text-gray-600">
                    {item?.attributes?.price}
                  </td>
                  <td className="border p-2 text-gray-600">
                    {item?.overviews?.created}
                  </td>
                  <td className="border p-2 text-gray-600">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border p-2 text-gray-600">
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="flex gap-2 flex-col items-center border-b justify-center pb-2">
                    <Button
                      bgColor="bg-green-400"
                      textColor="text-white"
                      text="Sửa"
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      bgColor="bg-red-400"
                      textColor="text-white"
                      text="Xóa"
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
