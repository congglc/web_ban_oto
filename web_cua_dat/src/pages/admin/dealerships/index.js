"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import AdminSidebar from "../components/Sidebar"
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaEye, FaMapMarkerAlt } from "react-icons/fa"

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

const DealershipManagement = () => {
  const [dealerships, setDealerships] = useState([])
  const [selectedDealership, setSelectedDealership] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingDealership, setEditingDealership] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dealershipData, setDealershipData] = useState({
    id: null,
    name: "",
    brand: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    openingHours: "",
    services: [],
    description: "",
    status: "active",
  })

  // Lấy dữ liệu đại lý từ localStorage khi component được mount
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    let storedDealerships = JSON.parse(localStorage.getItem("dealerships") || "[]")

    // Nếu không có dữ liệu, tạo dữ liệu mẫu
    if (storedDealerships.length === 0) {
      const sampleDealerships = [
        {
          id: 1,
          name: "Toyota Thăng Long",
          brand: "Toyota",
          address: "Số 15 Phạm Hùng, Nam Từ Liêm",
          city: "Hà Nội",
          phone: "024 3785 5555",
          email: "info@toyotathanglong.vn",
          website: "toyotathanglong.vn",
          openingHours: "8:00 - 18:00 (Thứ 2 - Chủ nhật)",
          services: ["Bán xe mới", "Bán xe cũ", "Bảo dưỡng", "Sửa chữa", "Phụ tùng"],
          description: "Đại lý Toyota chính hãng tại Hà Nội, cung cấp đầy đủ các dòng xe Toyota mới nhất.",
          status: "active",
        },
        {
          id: 2,
          name: "Honda Ô tô Giải Phóng",
          brand: "Honda",
          address: "Km 9 Đường Giải Phóng, Hoàng Mai",
          city: "Hà Nội",
          phone: "024 3634 5555",
          email: "info@hondagiaiphong.com.vn",
          website: "hondagiaiphong.com.vn",
          openingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
          services: ["Bán xe mới", "Bảo dưỡng", "Sửa chữa", "Phụ tùng"],
          description: "Đại lý Honda Ô tô chính hãng tại Hà Nội, chuyên cung cấp các dòng xe Honda mới nhất.",
          status: "active",
        },
        {
          id: 3,
          name: "Ford Phạm Văn Đồng",
          brand: "Ford",
          address: "168 Phạm Văn Đồng, Bắc Từ Liêm",
          city: "Hà Nội",
          phone: "024 6266 5555",
          email: "info@fordphamvandong.com",
          website: "fordphamvandong.com",
          openingHours: "8:00 - 18:00 (Thứ 2 - Chủ nhật)",
          services: ["Bán xe mới", "Bán xe cũ", "Bảo dưỡng", "Sửa chữa", "Phụ tùng"],
          description: "Đại lý Ford chính hãng tại Hà Nội, cung cấp đầy đủ các dòng xe Ford mới nhất.",
          status: "active",
        },
        {
          id: 4,
          name: "Hyundai Phạm Văn Đồng",
          brand: "Hyundai",
          address: "138 Phạm Văn Đồng, Bắc Từ Liêm",
          city: "Hà Nội",
          phone: "024 6680 5555",
          email: "info@hyundaiphamvandong.vn",
          website: "hyundaiphamvandong.vn",
          openingHours: "8:00 - 17:30 (Thứ 2 - Chủ nhật)",
          services: ["Bán xe mới", "Bảo dưỡng", "Sửa chữa", "Phụ tùng"],
          description: "Đại lý Hyundai chính hãng tại Hà Nội, cung cấp đầy đủ các dòng xe Hyundai mới nhất.",
          status: "active",
        },
        {
          id: 5,
          name: "Kia Nguyễn Văn Linh",
          brand: "Kia",
          address: "Số 67 Nguyễn Văn Linh, Quận 7",
          city: "Hồ Chí Minh",
          phone: "028 3770 5555",
          email: "info@kianguyenvanlinh.com.vn",
          website: "kianguyenvanlinh.com.vn",
          openingHours: "7:30 - 18:00 (Thứ 2 - Chủ nhật)",
          services: ["Bán xe mới", "Bán xe cũ", "Bảo dưỡng", "Sửa chữa", "Phụ tùng"],
          description: "Đại lý Kia chính hãng tại TP.HCM, cung cấp đầy đủ các dòng xe Kia mới nhất.",
          status: "inactive",
        },
      ]

      storedDealerships = sampleDealerships
      localStorage.setItem("dealerships", JSON.stringify(sampleDealerships))
    }

    setDealerships(storedDealerships)
  }, [])

  // Lọc đại lý theo từ khóa tìm kiếm
  const filteredDealerships = dealerships.filter(
    (dealership) =>
      dealership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealership.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealership.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDealership = (dealership) => {
    setSelectedDealership(dealership)
  }

  const handleCloseDetail = () => {
    setSelectedDealership(null)
  }

  const handleAddNewClick = () => {
    setDealershipData({
      id: null,
      name: "",
      brand: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      website: "",
      openingHours: "",
      services: [],
      description: "",
      status: "active",
    })
    setEditingDealership(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingDealership(null)
  }

  const handleEditDealership = (dealership) => {
    setDealershipData({
      ...dealership,
    })
    setEditingDealership(dealership.id)
    setShowForm(true)
  }

  const handleDeleteDealership = (dealershipId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đại lý này?")) {
      const updatedDealerships = dealerships.filter((dealership) => dealership.id !== dealershipId)
      setDealerships(updatedDealerships)
      localStorage.setItem("dealerships", JSON.stringify(updatedDealerships))

      // Nếu đang xem chi tiết đại lý bị xóa, đóng modal
      if (selectedDealership && selectedDealership.id === dealershipId) {
        setSelectedDealership(null)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDealershipData({
      ...dealershipData,
      [name]: value,
    })
  }

  const handleServicesChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setDealershipData({
        ...dealershipData,
        services: [...dealershipData.services, value],
      })
    } else {
      setDealershipData({
        ...dealershipData,
        services: dealershipData.services.filter((service) => service !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingDealership) {
      // Cập nhật đại lý đã tồn tại
      const updatedDealerships = dealerships.map((dealership) => {
        if (dealership.id === editingDealership) {
          return {
            ...dealershipData,
            id: editingDealership,
          }
        }
        return dealership
      })
      setDealerships(updatedDealerships)
      localStorage.setItem("dealerships", JSON.stringify(updatedDealerships))
      alert("Cập nhật thông tin đại lý thành công!")
    } else {
      // Thêm đại lý mới
      const newDealership = {
        ...dealershipData,
        id: Date.now(),
      }

      const updatedDealerships = [...dealerships, newDealership]
      setDealerships(updatedDealerships)
      localStorage.setItem("dealerships", JSON.stringify(updatedDealerships))
      alert("Thêm đại lý mới thành công!")
    }

    setShowForm(false)
    setEditingDealership(null)
  }

  const getStatusBadgeClass = (status) => {
    return status === "active" ? "status-active" : "status-inactive"
  }

  const getStatusText = (status) => {
    return status === "active" ? "Hoạt động" : "Không hoạt động"
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý danh bạ đại lý</h1>
          <Button variant="primary" onClick={handleAddNewClick}>
            <FaPlus className="icon-margin-right" /> Thêm đại lý mới
          </Button>
        </div>

        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, hãng xe hoặc thành phố..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showForm ? (
          <div className="add-dealership-container">
            <div className="form-header">
              <h2>{editingDealership ? "Cập nhật thông tin đại lý" : "Thêm đại lý mới"}</h2>
              <button className="close-button" onClick={handleCloseForm}>
                <FaTimes />
              </button>
            </div>
            <form className="add-dealership-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Tên đại lý</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={dealershipData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên đại lý"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Hãng xe</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={dealershipData.brand}
                    onChange={handleChange}
                    placeholder="Nhập hãng xe"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={dealershipData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ đại lý"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Thành phố</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={dealershipData.city}
                    onChange={handleChange}
                    placeholder="Nhập thành phố"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={dealershipData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={dealershipData.email}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={dealershipData.website}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ website"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="openingHours">Giờ mở cửa</label>
                  <input
                    type="text"
                    id="openingHours"
                    name="openingHours"
                    value={dealershipData.openingHours}
                    onChange={handleChange}
                    placeholder="Nhập giờ mở cửa"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Trạng thái</label>
                  <select id="status" name="status" value={dealershipData.status} onChange={handleChange} required>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Dịch vụ</label>
                  <div className="services-checkboxes">
                    {[
                      "Bán xe mới",
                      "Bán xe cũ",
                      "Bảo dưỡng",
                      "Sửa chữa",
                      "Phụ tùng",
                      "Bảo hiểm",
                      "Đăng ký, đăng kiểm",
                      "Tài chính, trả góp",
                    ].map((service) => (
                      <div className="service-checkbox" key={service}>
                        <input
                          type="checkbox"
                          id={`service-${service}`}
                          value={service}
                          checked={dealershipData.services.includes(service)}
                          onChange={handleServicesChange}
                        />
                        <label htmlFor={`service-${service}`}>{service}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    id="description"
                    name="description"
                    value={dealershipData.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả về đại lý"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" variant="secondary" onClick={handleCloseForm}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary">
                  {editingDealership ? "Cập nhật" : "Thêm đại lý"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dealerships-list-container">
            {filteredDealerships.length === 0 ? (
              <div className="no-dealerships">
                <p>Không tìm thấy đại lý nào phù hợp với từ khóa tìm kiếm.</p>
              </div>
            ) : (
              <table className="dealerships-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên đại lý</th>
                    <th>Hãng xe</th>
                    <th>Thành phố</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDealerships.map((dealership) => (
                    <tr key={dealership.id}>
                      <td>#{dealership.id.toString().slice(-4)}</td>
                      <td>{dealership.name}</td>
                      <td>{dealership.brand}</td>
                      <td>{dealership.city}</td>
                      <td>{dealership.phone}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(dealership.status)}`}>
                          {getStatusText(dealership.status)}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button
                          className="view-button"
                          onClick={() => handleViewDealership(dealership)}
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="edit-button"
                          onClick={() => handleEditDealership(dealership)}
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteDealership(dealership.id)}
                          title="Xóa"
                        >
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

        {selectedDealership && (
          <div className="dealership-detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Chi tiết đại lý</h3>
                <button className="close-button" onClick={handleCloseDetail}>
                  ×
                </button>
              </div>

              <div className="dealership-detail">
                <div className="dealership-info">
                  <h4>{selectedDealership.name}</h4>
                  <p className="dealership-id">ID: #{selectedDealership.id.toString().slice(-4)}</p>

                  <div className="info-section">
                    <div className="info-row">
                      <span className="info-label">Hãng xe:</span>
                      <span className="info-value">{selectedDealership.brand}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Địa chỉ:</span>
                      <span className="info-value">
                        <FaMapMarkerAlt className="location-icon" /> {selectedDealership.address},{" "}
                        {selectedDealership.city}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Số điện thoại:</span>
                      <span className="info-value">{selectedDealership.phone}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{selectedDealership.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Website:</span>
                      <span className="info-value">{selectedDealership.website}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Giờ mở cửa:</span>
                      <span className="info-value">{selectedDealership.openingHours}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Trạng thái:</span>
                      <span className={`status-badge ${getStatusBadgeClass(selectedDealership.status)}`}>
                        {getStatusText(selectedDealership.status)}
                      </span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h5>Dịch vụ</h5>
                    <div className="dealership-services">
                      {selectedDealership.services.map((service, index) => (
                        <span key={index} className="service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="info-section">
                    <h5>Mô tả</h5>
                    <p className="dealership-description">{selectedDealership.description || "Không có mô tả"}</p>
                  </div>
                </div>

                <div className="detail-actions">
                  <Button variant="secondary" onClick={handleCloseDetail}>
                    Đóng
                  </Button>
                  <Button variant="primary" onClick={() => handleEditDealership(selectedDealership)}>
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

export default memo(DealershipManagement)
