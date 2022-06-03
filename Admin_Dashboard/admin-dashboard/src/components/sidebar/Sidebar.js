import React from "react";
import {
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
              <Link to={"/"}>Home</Link>
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebaricon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebaricon" />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <PersonOutline className="sidebaricon" />
              <Link to={"/users"}>Users</Link>
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebaricon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebaricon" />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <LineStyle className="sidebaricon" />
              Home
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebaricon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebaricon" />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <LineStyle className="sidebaricon" />
              Home
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebaricon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebaricon" />
              Sales
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
