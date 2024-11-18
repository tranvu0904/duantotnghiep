import React, { useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";

const {
  MdOutlineHouseSiding,
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  FiSearch,
} = icons;

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});

  const { categories, prices, areas, provinces } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, header, defaultText) => {
    setName(name);
    setHeader(header);
    setContent(content);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };

  const handleSubmit = (e, query, arrMinMax) => {
    e.stopPropagation();
    setQueries((prev) => ({ ...prev, ...query }));
    arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
    setIsShowModal(false);
  };

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Code") || item[0].includes("Number"))
      .filter((item) => item[1]);
    let queryCodesObj = {};

    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryTexts = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") && !item[0].includes("Number")
    );
    let queryTextsObj = {};

    queryTexts.forEach((item) => {
      queryTextsObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextsObj.category ? queryTextsObj.category : "Cho thuê tất cả"
    } ${queryTextsObj.province ? `tỉnh ${queryTextsObj.province}` : ""} ${
      queryTextsObj.price ? `giá ${queryTextsObj.price}` : ""
    } ${queryTextsObj.area ? `diện tích ${queryTextsObj.area}` : ""}`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: titleSearch }
    );
  };

  return (
    <>
      <div className="p-[10px] my-3 w-3/4 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-3">
        <span
          className="flex-1 cursor-pointer"
          onClick={() =>
            handleShowModal(categories, "category", "chọn loại", "Tất cả")
          }
        >
          <SearchItem
            iconBefore={<MdOutlineHouseSiding />}
            iconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.category}
            defaultText={"Tất cả"}
          />
        </span>

        <span
          className="flex-1 cursor-pointer"
          onClick={() =>
            handleShowModal(provinces, "province", "chọn tỉnh", "Toàn quốc")
          }
        >
          <SearchItem
            iconBefore={<HiOutlineLocationMarker />}
            iconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.province}
            defaultText={"Toàn quốc"}
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() =>
            handleShowModal(prices, "price", "chọn giá", "Chọn giá")
          }
        >
          <SearchItem
            iconBefore={<TbReportMoney />}
            iconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.price}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() =>
            handleShowModal(areas, "area", "chọn diện tích", "Chọn diện tích")
          }
        >
          <SearchItem
            iconBefore={<RiCrop2Line />}
            iconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.area}
            defaultText={"Chọn diện tích"}
          />
        </span>
        <button
          className="bg-orange-500 flex flex-1 items-center justify-center text-[13.3px] gap-3 rounded-md w-3/4 text-white outline-none py-2 px-4"
          type="button"
          onClick={handleSearch}
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          handleSubmit={handleSubmit}
          content={content}
          name={name}
          queries={queries}
          header={header}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
          setIsShowModal={setIsShowModal}
        />
      )}
    </>
  );
};

export default Search;
