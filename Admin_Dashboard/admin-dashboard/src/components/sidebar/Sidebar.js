import React from "react";
import {
  AddBox,
  CheckBoxOutlineBlank,
  LineStyle,
  PersonOutline,
  Timeline,
  TrendingUp,
} from "@material-ui/icons";
import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <LineStyle className="sidebaricon" />
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li className="sidebarListItem ">
              <PersonOutline className="sidebaricon" />
              <Link to={"/users"} style={{ textDecoration: "none" }}>
                Exporters
              </Link>
            </li>
            <li className="sidebarListItem ">
              <PersonOutline className="sidebaricon" />
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Importers
              </Link>
            </li>
            <li className="sidebarListItem ">
              <AddBox className="sidebaricon" />
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
