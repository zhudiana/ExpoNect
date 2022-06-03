import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ExpoNect</span>
        </div>
        <div className="topRight">
          <div className="tobarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="tobarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="tobarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
