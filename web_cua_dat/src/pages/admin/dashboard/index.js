"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import AdminSidebar from "../components/Sidebar"
import { FaUsers, FaCar, FaAddressBook, FaCarAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    newCars: 0,
    usedCars: 0,
    totalUsers: 0,
    totalDealerships: 0,
  })

  const [recentListings, setRecentListings] = useState([])

  // Mô phỏng dữ liệu thống kê
  useEffect(() => {
    // Trong thực tế, dữ liệu này sẽ được lấy từ API
    setStats({
      totalCars: 120,
      newCars: 45,
      usedCars: 75,
      totalUsers: 350,
      totalDealerships: 28,
    })

    const mockRecentListings = [
      {
        id: 1,
        title: "Toyota Camry 2.5Q 2020",
        price: "950.000.000",
        status: "active",
        date: "15/03/2023",
        type: "used",
      },
      {
        id: 2,
        title: "Honda Civic RS 2022",
        price: "870.000.000",
        status: "pending",
        date: "16/03/2023",
        type: "used",
      },
      {
        id: 3,
        title: "Mazda CX-5 2.5 Premium 2023",
        price: "1.050.000.000",
        status: "active",
        date: "17/03/2023",
        type: "new",
      },
      {
        id: 4,
        title: "Kia Seltos 1.4 Premium 2022",
        price: "720.000.000",
        status: "active",
        date: "18/03/2023",
        type: "used",
      },
      {
        id: 5,
        title: "Ford Ranger Wildtrak 2023",
        price: "965.000.000",
        status: "pending",
        date: "19/03/2023",
        type: "new",
      },
    ]

    setRecentListings(mockRecentListings)
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active"
      case "pending":
        return "status-pending"
      case "rejected":
        return "status-rejected"
      default:
        return ""
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang hiển thị"
      case "pending":
        return "Chờ duyệt"
      case "rejected":
        return "Đã từ chối"
      default:
        return status
    }
  }

  const getTypeText = (type) => {
    return type === "new" ? "Xe mới" : "Xe cũ"
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <FaCar />
            </div>
            <div className="stat-content">
              <h3>Tổng số xe</h3>
              <p>{stats.totalCars}</p>
            </div>
            <Link to={ROUTERS.ADMIN.CARS} className="stat-link">
              Quản lý
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCarAlt />
            </div>
            <div className="stat-content">
              <h3>Xe mới</h3>
              <p>{stats.newCars}</p>
            </div>
            <Link to={`${ROUTERS.ADMIN.CARS}?type=new`} className="stat-link">
              Xem
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCarAlt />
            </div>
            <div className="stat-content">
              <h3>Xe cũ</h3>
              <p>{stats.usedCars}</p>
            </div>
            <Link to={`${ROUTERS.ADMIN.CARS}?type=used`} className="stat-link">
              Xem
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Người dùng</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <Link to={ROUTERS.ADMIN.USERS} className="stat-link">
              Quản lý
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaAddressBook />
            </div>
            <div className="stat-content">
              <h3>Đại lý</h3>
              <p>{stats.totalDealerships}</p>
            </div>
            <Link to={ROUTERS.ADMIN.DEALERSHIPS} className="stat-link">
              Quản lý
            </Link>
          </div>
        </div>

        <div className="recent-listings">
          <div className="section-header">
            <h2>Tin đăng gần đây</h2>
            <Link to={ROUTERS.ADMIN.CARS} className="view-all">
              Xem tất cả
            </Link>
          </div>

          <div className="listings-table-container">
            <table className="listings-table">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Giá (VNĐ)</th>
                  <th>Loại</th>
                  <th>Ngày đăng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentListings.map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.title}</td>
                    <td>{listing.price}</td>
                    <td>{getTypeText(listing.type)}</td>
                    <td>{listing.date}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(listing.status)}`}>
                        {getStatusText(listing.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)
