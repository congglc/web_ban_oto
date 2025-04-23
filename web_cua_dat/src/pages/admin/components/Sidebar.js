"use client"

import { memo, useState } from "react"
import "./Sidebar.scss"
import { Link, useLocation } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { FaHome, FaCar, FaUsers, FaAddressBook, FaSignOutAlt, FaBars } from "react-icons/fa"

const AdminSidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      name: "Dashboard",
      path: ROUTERS.ADMIN.DASHBOARD,
      icon: <FaHome />,
    },
    {
      name: "Quản lý xe",
      path: ROUTERS.ADMIN.CARS,
      icon: <FaCar />,
    },
    {
      name: "Quản lý người dùng",
      path: ROUTERS.ADMIN.USERS,
      icon: <FaUsers />,
    },
    {
      name: "Quản lý danh bạ",
      path: ROUTERS.ADMIN.DEALERSHIPS,
      icon: <FaAddressBook />,
    },
  ]

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    window.location.href = ROUTERS.ADMIN.LOGIN
  }

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">OTO</div>
        <h2 className="sidebar-title">Quản lý OTO.COM.VN</h2>
        <button className="collapse-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          <span className="text">Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

export default memo(AdminSidebar)
