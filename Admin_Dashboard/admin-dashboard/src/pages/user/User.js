import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Exporter</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUserName">Anna Becker</span>
              <span className="userShowUserTitle">Sales woman</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">kirubel</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+3 478 4748</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">kirubel@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Addis Ababa</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateItem">
              <div className="userUpdateLeft">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="nani"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <div className="userUpdateLeft">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="nani "
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <div className="userUpdateLeft">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="nani@gmail.com"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <div className="userUpdateLeft">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="453453423"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <div className="userUpdateLeft">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Ethiopia"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <button className="userUpdateButton">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
