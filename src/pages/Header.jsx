import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-slate-500 shadow-sm">
      <Link to="/">
        <img
          src="/logo192.png"
          alt="logo"
          style={{ width: "48px", height: "auto" }}
        />
      </Link>
      <div className="flex gap-4 text-white">
        <Link to="/about" className="hover:text-slate-400">
          About
        </Link>
        <Link to="/about" className="hover:text-slate-400">
          About
        </Link>
        <Link to="/about" className="hover:text-slate-400">
          About
        </Link>
      </div>
    </div>
  );
};

export default Header;
