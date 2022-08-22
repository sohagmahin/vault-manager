import React from "react";
import { Link } from "react-router-dom";
import windowDimention from "../../hooks/useWindowSize";
const Header = () => {
  const { width } = windowDimention();

  return (
    <div className="navbar bg-base-100 shadow-md justify-between">
      <div className="flex">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          {width > 640 ? "Vault Manager" : "VM"}
        </Link>
      </div>
      <div className="flex-none gap-2 px-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by title"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              {/* <a className="justify-between" href="#profile">
                Profile
                <span className="badge">New</span>
              </a> */}
              <Link to={"/profile"}>
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/auth"}
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
