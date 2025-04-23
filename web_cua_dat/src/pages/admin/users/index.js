"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import AdminSidebar from "../components/Sidebar"
import { FaEye, FaEdit, FaTrash, FaPlus, FaTimes, FaSearch } from "react-icons/fa"

const Button = ({ children, variant = "primary", type = "button", onClick, disabled = false }) => {
  return (
    <button
      type={type}
      className={`admin-button ${variant} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    status: "active",
    registeredAt: "",
    bio: "",
    carInterests: [],
    purchaseHistory: [],
  })

  // Lấy dữ liệu người dùng từ localStorage khi component được mount
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Nếu không có dữ liệu, tạo dữ liệu mẫu
    if (storedUsers.length === 0) {
      const sampleUsers = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0987654321",
          address: "Hà Nội",
          role: "admin",
          status: "active",
          registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 ngày trước
          bio: "Quản trị viên hệ thống",
          carInterests: ["Toyota", "Honda"],
          purchaseHistory: [
            {
              carId: 1,
              carName: "Toyota Fortuner 2.7 AT 4x2",
              purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
              price: 1250000000,
            },
          ],
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "tranthib@example.com",
          phone: "0912345678",
          address: "Hồ Chí Minh",
          role: "user",
          status: "active",
          registeredAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 ngày trước
          bio: "Người dùng thường xuyên tìm kiếm xe",
          carInterests: ["Ford", "Hyundai"],
          purchaseHistory: [],
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "levanc@example.com",
          phone: "0978123456",
          address: "Đà Nẵng",
          role: "user",
          status: "inactive",
          registeredAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 ngày trước
          bio: "Người dùng không hoạt động",
          carInterests: ["Mazda"],
          purchaseHistory: [],
        },
        {
          id: 4,
          name: "Phạm Văn D",
          email: "phamvand@example.com",
          phone: "0965432109",
          address: "Hải Phòng",
          role: "dealer",
          status: "active",
          registeredAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 ngày trước
          bio: "Đại lý xe Toyota",
          carInterests: ["Toyota"],
          purchaseHistory: [],
        },
        {
          id: 5,
          name: "Hoàng Thị E",
          email: "hoangthie@example.com",
          phone: "0932109876",
          address: "Cần Thơ",
          role: "user",
          status: "active",
          registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 ngày trước
          bio: "Người dùng mới đăng ký",
          carInterests: ["Honda", "Kia"],
          purchaseHistory: [
            {
              carId: 2,
              carName: "Honda CR-V L 2022",
              purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              price: 1090000000,
            },
          ],
        },
      ]

      storedUsers = sampleUsers
      localStorage.setItem("users", JSON.stringify(sampleUsers))
    }

    setUsers(storedUsers)
  }, [])

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const handleViewUser = (user) => {
    setSelectedUser(user)
  }

  const handleCloseDetail = () => {
    setSelectedUser(null)
  }

  const handleAddNewClick = () => {
    setUserData({
      id: null,
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "user",
      status: "active",
      registeredAt: "",
      bio: "",
      carInterests: [],
      purchaseHistory: [],
    })
    setEditingUser(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  const handleEditUser = (user) => {
    setUserData({
      ...user,
    })
    setEditingUser(user.id)
    setShowForm(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Nếu đang xem chi tiết người dùng bị xóa, đóng modal
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleCarInterestsChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setUserData({
        ...userData,
        carInterests: [...userData.carInterests, value],
      })
    } else {
      setUserData({
        ...userData,
        carInterests: userData.carInterests.filter((interest) => interest !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingUser) {
      // Cập nhật người dùng đã tồn tại
      const updatedUsers = users.map((user) => {
        if (user.id === editingUser) {
          return {
            ...userData,
            id: editingUser,
          }
        }
        return user
      })
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      alert("Cập nhật thông tin người dùng thành công!")
    } else {
      // Thêm người dùng mới
      const newUser = {
        ...userData,
        id: Date.now(),
        registeredAt: new Date().toISOString(),
      }

      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      alert("Thêm người dùng mới thành công!")
    }

    setShowForm(false)
    setEditingUser(null)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "role-admin"
      case "dealer":
        return "role-dealer"
      default:
        return "role-user"
    }
  }

  const getStatusBadgeClass = (status) => {
    return status === "active" ? "status-active" : "status-inactive"
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý người dùng</h1>
          <Button variant="primary" onClick={handleAddNewClick}>
            <FaPlus className="icon-margin-right" /> Thêm người dùng mới
          </Button>
        </div>

        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showForm ? (
          <div className="add-user-container">
            <div className="form-header">
              <h2>{editingUser ? "Cập nhật thông tin người dùng" : "Thêm người dùng mới"}</h2>
              <button className="close-button" onClick={handleCloseForm}>
                <FaTimes />
              </button>
            </div>
            <form className="add-user-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Vai trò</label>
                <select id="role" name="role" value={userData.role} onChange={handleChange} required>
                  <option value="user">Người dùng</option>
                  <option value="dealer">Đại lý</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Trạng thái</label>
                <select id="status" name="status" value={userData.status} onChange={handleChange} required>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quan tâm đến hãng xe</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Toyota"
                      checked={userData.carInterests.includes("Toyota")}
                      onChange={handleCarInterestsChange}
                    />
                    Toyota
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Honda"
                      checked={userData.carInterests.includes("Honda")}
                      onChange={handleCarInterestsChange}
                    />
                    Honda
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Ford"
                      checked={userData.carInterests.includes("Ford")}
                      onChange={handleCarInterestsChange}
                    />
                    Ford
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Hyundai"
                      checked={userData.carInterests.includes("Hyundai")}
                      onChange={handleCarInterestsChange}
                    />
                    Hyundai
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Kia"
                      checked={userData.carInterests.includes("Kia")}
                      onChange={handleCarInterestsChange}
                    />
                    Kia
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Mazda"
                      checked={userData.carInterests.includes("Mazda")}
                      onChange={handleCarInterestsChange}
                    />
                    Mazda
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Giới thiệu</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  placeholder="Nhập thông tin giới thiệu"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <Button type="button" variant="secondary" onClick={handleCloseForm}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary">
                  {editingUser ? "Cập nhật" : "Thêm người dùng"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="users-list-container">
            {filteredUsers.length === 0 ? (
              <div className="no-users">
                <p>Không tìm thấy người dùng nào phù hợp với từ khóa tìm kiếm.</p>
              </div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày đăng ký</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id.toString().slice(-4)}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                          {user.role === "admin" ? "Quản trị viên" : user.role === "dealer" ? "Đại lý" : "Người dùng"}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                          {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </span>
                      </td>
                      <td>{formatDate(user.registeredAt)}</td>
                      <td className="action-buttons">
                        <button className="view-button" onClick={() => handleViewUser(user)} title="Xem chi tiết">
                          <FaEye />
                        </button>
                        <button className="edit-button" onClick={() => handleEditUser(user)} title="Chỉnh sửa">
                          <FaEdit />
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteUser(user.id)} title="Xóa">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {selectedUser && (
          <div className="user-detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Chi tiết người dùng</h3>
                <button className="close-button" onClick={handleCloseDetail}>
                  ×
                </button>
              </div>

              <div className="user-detail">
                <div className="user-avatar">
                  <div className="avatar-placeholder">{selectedUser.name.charAt(0)}</div>
                </div>

                <div className="user-info">
                  <h4>{selectedUser.name}</h4>
                  <p className="user-id">ID: #{selectedUser.id.toString().slice(-4)}</p>
                  <p className="user-email">
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p className="user-phone">
                    <strong>Số điện thoại:</strong> {selectedUser.phone}
                  </p>
                  <p className="user-address">
                    <strong>Địa chỉ:</strong> {selectedUser.address}
                  </p>
                  <p className="user-role">
                    <strong>Vai trò:</strong>{" "}
                    <span className={`role-badge ${getRoleBadgeClass(selectedUser.role)}`}>
                      {selectedUser.role === "admin"
                        ? "Quản trị viên"
                        : selectedUser.role === "dealer"
                          ? "Đại lý"
                          : "Người dùng"}
                    </span>
                  </p>
                  <p className="user-status">
                    <strong>Trạng thái:</strong>{" "}
                    <span className={`status-badge ${getStatusBadgeClass(selectedUser.status)}`}>
                      {selectedUser.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </p>
                  <p className="user-registered">
                    <strong>Ngày đăng ký:</strong> {formatDate(selectedUser.registeredAt)}
                  </p>
                  <p className="user-interests">
                    <strong>Quan tâm đến hãng xe:</strong>{" "}
                    {selectedUser.carInterests && selectedUser.carInterests.length > 0
                      ? selectedUser.carInterests.join(", ")
                      : "Chưa có thông tin"}
                  </p>
                  <div className="user-purchase-history">
                    <strong>Lịch sử mua xe:</strong>
                    {selectedUser.purchaseHistory && selectedUser.purchaseHistory.length > 0 ? (
                      <ul className="purchase-list">
                        {selectedUser.purchaseHistory.map((purchase, index) => (
                          <li key={index} className="purchase-item">
                            <div className="purchase-car">{purchase.carName}</div>
                            <div className="purchase-date">Ngày mua: {formatDate(purchase.purchaseDate)}</div>
                            <div className="purchase-price">Giá: {formatPrice(purchase.price)}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Chưa có lịch sử mua xe</p>
                    )}
                  </div>
                  <p className="user-bio">
                    <strong>Giới thiệu:</strong> {selectedUser.bio || "Không có thông tin"}
                  </p>
                </div>

                <div className="detail-actions">
                  <Button variant="secondary" onClick={handleCloseDetail}>
                    Đóng
                  </Button>
                  <Button variant="primary" onClick={() => handleEditUser(selectedUser)}>
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(UserManagement)
