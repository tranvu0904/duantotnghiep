import icons from './icons'

const { MdOutlineLibraryBooks,ImPencil2,BiUserPin } = icons
const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-tin-dang",
    icon: <ImPencil2 size={16}/>
  },
  {
    id: 2,
    text: "Quản lí tin đăng",
    path: "/he-thong/quan-li-bai-dang",
    icon: <MdOutlineLibraryBooks size={16}/>
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserPin size={16}/>
  },
];

export default menuManage;
