import React, { useEffect, useRef } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Contact } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../utils/constant";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navRef = useRef();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = (e) => {
      if (window.pageYOffset >= 134) {
        navRef.current.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index:50;
        `;
      } else {
        navRef.current.style.cssText = `
        width: 100%
        `;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full flex flex-col items-center m-auto h-full">
      <Header />
      <div ref={navRef} className="w-full">
        <Navigation />
      </div>
      {isLoggedIn &&
        location.pathname !== `/${path.CONTACT}` &&
        !location.pathname.includes(path.DETAIL) && <Search />}
      <div className="w-3/4 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      {/* <Intro /> */}
      <Contact />
      <div className="h-6"></div>
    </div>
  );
}

export default Home;
