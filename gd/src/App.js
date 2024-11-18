import { Routes, Route } from "react-router-dom";
import {
  DetailPost,
  Home,
  Login,
  Homepage,
  Rental,
  SearchDetail,
  Contact
} from "./containers/Public";
import {
  CreatePost,
  EditAccount,
  ManagePost,
  System,
} from "./containers/System";
import { path } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./store/actions";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);

  return (
    <div className=" bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={"*"} element={<Homepage />} />
          <Route path={path.HOME__PAGE} element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route
            path={path.DETAIL_POST__TITLE__IDPOST}
            element={<DetailPost />}
          />
          {/* <Route path={path.DETAIL} element={<DetailPost />} /> */}
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
