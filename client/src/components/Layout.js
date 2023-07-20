import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, teacherMenu } from "./Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

export const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //********************************************************** */

  // Student Menu
  const studentMenu = [
    {
      name: "Profile",
      path: `/student/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Assignments",
      path: "/assessments",
      icon: "fa-solid fa-folder",
    },
    {
      name: "Scores",
      path: "/student/scores",
      icon: "fa-solid fa-table",
    },
    {
      name: "Performance",
      path: "/student/performance",
      icon: "fa-solid fa-square-poll-vertical",
    },
  ];

  //********************************************************** */

  // rendering menulist
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isTeacher
    ? teacherMenu
    : studentMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Dashboard</h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge count={user && user.notification.length}>
                  <i class="fa-solid fa-bell"></i>
                </Badge>
                <Link to={`/student/profile/${user?._id}`}>{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
