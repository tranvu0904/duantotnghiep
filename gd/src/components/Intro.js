// import React from "react";
// import { text } from "../utils/dataIntro";
// import icons from "../utils/icons";
// import Button from "../components/Button";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";
// import menuManage from "../utils/menuManage";

// const { GrStar } = icons;
// const star = [1, 2, 3, 4, 5];

// const Intro = () => {
//   const navigate = useNavigate()
//   const { categories } = useSelector((state) => state.app);
//   const handleClick = () => {
//     navigate(menuManage[0].path);
//   };

//   return (
//     <div className="w-3/4 flex flex-col justify-center items-center bg-white shadow-md rounded-md p-4 my-10 ">
//       <h3 className="font-bold text-lg my-2">{text.title}</h3>
//       <p className="text-center text-gray-800 my-2">
//         {text.description}
//         <span className="text-link">
//           {categories.length > 0 &&
//             categories.map((item) => {
//               return (
//                 <Link
//                   to={`/${formatVietnameseToString(item.value)}`}
//                   key={item.code}
//                   className="text-blue-600 font-medium hover:text-orange-600"
//                 >{`${item.value.toLowerCase()}, `}</Link>
//               );
//             })}
//         </span>
//         {text.description2}
//       </p>
//       {/* <div className="flex justify-around flex-row w-4/5 my-2">
//         {text.statistic.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-col justify-center items-center"
//             >
//               <p className="font-bold">{item.value}</p>
//               <p>{item.name}</p>
//             </div>
//           );
//         })}
//       </div> */}
//       <h3 className="font-bold text-lg my-2 ">{text.price}</h3>
//       <div className="flex items-center justify-center gap-1">
//         {star.map((item) => {
//           return (
//             <span key={item}>
//               <GrStar size={24} color="yellow" />
//             </span>
//           );
//         })}
//       </div>
//       <p className="italic text-center text-gray-600 my-2">{text.comment}</p>
//       <span className="text-gray-700 mb-2">{text.author}</span>
//       <h3 className="text-lg font-bold my-2">{text.question}</h3>
//       <p className="mt-2 mb-4">{text.answer}</p>
//       <Button
//         bgColor="bg-secondary2"
//         text="Đăng tin ngay"
//         textColor="text-white"
//         px="px-6"
//         onClick={handleClick}
//       />
//       <div className="h-12"></div>
//     </div>
//   );
// };

// export default Intro;
