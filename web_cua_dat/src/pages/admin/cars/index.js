"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import AdminSidebar from "../components/Sidebar"
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaEye, FaFilter } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"

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

const CarManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const typeFilter = queryParams.get("type") || "all"

  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState(typeFilter)
  const [carData, setCarData] = useState({
    id: null,
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuel: "gasoline",
    transmission: "automatic",
    type: "used",
    status: "pending",
    description: "",
    features: [],
    images: [],
    seller: {
      name: "",
      phone: "",
      location: "",
    },
    createdAt: "",
  })

  // Lấy dữ liệu xe từ localStorage khi component được mount
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    let storedCars = JSON.parse(localStorage.getItem("cars") || "[]")

    // Nếu không có dữ liệu, tạo dữ liệu mẫu
    if (storedCars.length === 0) {
      const sampleCars = [
        {
          id: 1,
          title: "Toyota Camry 2.5Q 2020",
          brand: "Toyota",
          model: "Camry",
          year: "2020",
          price: "950000000",
          mileage: "25000",
          fuel: "gasoline",
          transmission: "automatic",
          type: "used",
          status: "active",
          description: "Xe đẹp, đi giữ gìn, bảo dưỡng định kỳ tại hãng",
          features: ["Cảm biến lùi", "Camera 360", "Cửa sổ trời", "Ghế da"],
          images: ["/placeholder.svg?height=300&width=500"],
          seller: {
            name: "Nguyễn Văn A",
            phone: "0987654321",
            location: "Hà Nội",
          },
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          title: "Honda Civic RS 2022",
          brand: "Honda",
          model: "Civic",
          year: "2022",
          price: "870000000",
          mileage: "8000",
          fuel: "gasoline",
          transmission: "automatic",
          type: "used",
          status: "pending",
          description: "Xe gia đình sử dụng, còn mới, đầy đủ tính năng an toàn",
          features: ["Cảm biến lùi", "Camera lùi", "Cửa sổ trời", "Ghế da"],
          images: ["/placeholder.svg?height=300&width=500"],
          seller: {
            name: "Trần Văn B",
            phone: "0912345678",
            location: "Hồ Chí Minh",
          },
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          title: "Mazda CX-5 2.5 Premium 2023",
          brand: "Mazda",
          model: "CX-5",
          year: "2023",
          price: "1050000000",
          mileage: "0",
          fuel: "gasoline",
          transmission: "automatic",
          type: "new",
          status: "active",
          description: "Xe mới 100%, đủ màu giao ngay, nhiều ưu đãi",
          features: ["Cảm biến lùi", "Camera 360", "Cửa sổ trời", "Ghế da", "Lẫy chuyển số"],
          images: ["/placeholder.svg?height=300&width=500"],
          seller: {
            name: "Đại lý Mazda Trường Chinh",
            phone: "0978123456",
            location: "Hà Nội",
          },
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 4,
          title: "Kia Seltos 1.4 Premium 2022",
          brand: "Kia",
          model: "Seltos",
          year: "2022",
          price: "720000000",
          mileage: "12000",
          fuel: "gasoline",
          transmission: "automatic",
          type: "used",
          status: "active",
          description: "Xe đẹp như mới, bảo dưỡng định kỳ tại hãng",
          features: ["Cảm biến lùi", "Camera lùi", "Màn hình cảm ứng", "Apple CarPlay"],
          images: ["/placeholder.svg?height=300&width=500"],
          seller: {
            name: "Lê Thị C",
            phone: "0965432109",
            location: "Đà Nẵng",
          },
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 5,
          title: "Ford Ranger Wildtrak 2023",
          brand: "Ford",
          model: "Ranger",
          year: "2023",
          price: "965000000",
          mileage: "0",
          fuel: "diesel",
          transmission: "automatic",
          type: "new",
          status: "pending",
          description: "Xe mới 100%, đủ màu giao ngay, tặng phụ kiện",
          features: ["Cảm biến lùi", "Camera 360", "Ghế da", "Định vị GPS", "Hỗ trợ đỗ xe"],
          images: ["/placeholder.svg?height=300&width=500"],
          seller: {
            name: "Đại lý Ford Mỹ Đình",
            phone: "0932109876",
            location: "Hà Nội",
          },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      storedCars = sampleCars
      localStorage.setItem("cars", JSON.stringify(sampleCars))
    }

    setCars(storedCars)
  }, [])

  // Cập nhật URL khi thay đổi bộ lọc
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (filterType !== "all") {
      params.set("type", filterType)
    } else {
      params.delete("type")
    }
    navigate({ search: params.toString() }, { replace: true })
  }, [filterType, navigate, location.search])

  // Lọc xe theo từ khóa tìm kiếm và loại xe
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || car.type === filterType

    return matchesSearch && matchesType
  })

  const handleViewCar = (car) => {
    setSelectedCar(car)
  }

  const handleCloseDetail = () => {
    setSelectedCar(null)
  }

  const handleAddNewClick = () => {
    setCarData({
      id: null,
      title: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuel: "gasoline",
      transmission: "automatic",
      type: "used",
      status: "pending",
      description: "",
      features: [],
      images: [],
      seller: {
        name: "",
        phone: "",
        location: "",
      },
      createdAt: "",
    })
    setEditingCar(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCar(null)
  }

  const handleEditCar = (car) => {
    setCarData({
      ...car,
    })
    setEditingCar(car.id)
    setShowForm(true)
  }

  const handleDeleteCar = (carId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa xe này?")) {
      const updatedCars = cars.filter((car) => car.id !== carId)
      setCars(updatedCars)
      localStorage.setItem("cars", JSON.stringify(updatedCars))

      // Nếu đang xem chi tiết xe bị xóa, đóng modal
      if (selectedCar && selectedCar.id === carId) {
        setSelectedCar(null)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("seller.")) {
      const sellerField = name.split(".")[1]
      setCarData({
        ...carData,
        seller: {
          ...carData.seller,
          [sellerField]: value,
        },
      })
    } else {
      setCarData({
        ...carData,
        [name]: value,
      })
    }
  }

  const handleFeaturesChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setCarData({
        ...carData,
        features: [...carData.features, value],
      })
    } else {
      setCarData({
        ...carData,
        features: carData.features.filter((feature) => feature !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingCar) {
      // Cập nhật xe đã tồn tại
      const updatedCars = cars.map((car) => {
        if (car.id === editingCar) {
          return {
            ...carData,
            id: editingCar,
          }
        }
        return car
      })
      setCars(updatedCars)
      localStorage.setItem("cars", JSON.stringify(updatedCars))
      alert("Cập nhật thông tin xe thành công!")
    } else {
      // Thêm xe mới
      const newCar = {
        ...carData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        images: ["/placeholder.svg?height=300&width=500"],
      }

      const updatedCars = [...cars, newCar]
      setCars(updatedCars)
      localStorage.setItem("cars", JSON.stringify(updatedCars))
      alert("Thêm xe mới thành công!")
    }

    setShowForm(false)
    setEditingCar(null)
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
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ"
  }

  const getStatusBadgeClass = (status) => {
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

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý xe</h1>
          <Button variant="primary" onClick={handleAddNewClick}>
            <FaPlus className="icon-margin-right" /> Thêm xe mới
          </Button>
        </div>

        <div className="filter-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, hãng, mẫu xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-options">
            <FaFilter className="filter-icon" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option value="all">Tất cả xe</option>
              <option value="new">Xe mới</option>
              <option value="used">Xe cũ</option>
            </select>
          </div>
        </div>

        {showForm ? (
          <div className="add-car-container">
            <div className="form-header">
              <h2>{editingCar ? "Cập nhật thông tin xe" : "Thêm xe mới"}</h2>
              <button className="close-button" onClick={handleCloseForm}>
                <FaTimes />
              </button>
            </div>
            <form className="add-car-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Tiêu đề</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={carData.title}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brand">Hãng xe</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={carData.brand}
                    onChange={handleChange}
                    placeholder="Nhập hãng xe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="model">Mẫu xe</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={carData.model}
                    onChange={handleChange}
                    placeholder="Nhập mẫu xe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Năm sản xuất</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={carData.year}
                    onChange={handleChange}
                    placeholder="Nhập năm sản xuất"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Giá (VNĐ)</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={carData.price}
                    onChange={handleChange}
                    placeholder="Nhập giá xe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mileage">Số km đã đi</label>
                  <input
                    type="text"
                    id="mileage"
                    name="mileage"
                    value={carData.mileage}
                    onChange={handleChange}
                    placeholder="Nhập số km đ�� đi"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fuel">Nhiên liệu</label>
                  <select id="fuel" name="fuel" value={carData.fuel} onChange={handleChange} required>
                    <option value="gasoline">Xăng</option>
                    <option value="diesel">Dầu</option>
                    <option value="electric">Điện</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transmission">Hộp số</label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={carData.transmission}
                    onChange={handleChange}
                    required
                  >
                    <option value="automatic">Tự động</option>
                    <option value="manual">Số sàn</option>
                    <option value="cvt">CVT</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Loại xe</label>
                  <select id="type" name="type" value={carData.type} onChange={handleChange} required>
                    <option value="new">Xe mới</option>
                    <option value="used">Xe cũ</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Trạng thái</label>
                  <select id="status" name="status" value={carData.status} onChange={handleChange} required>
                    <option value="active">Đang hiển thị</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="rejected">Đã từ chối</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    id="description"
                    name="description"
                    value={carData.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả chi tiết về xe"
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Tính năng</label>
                  <div className="features-checkboxes">
                    {[
                      "Cảm biến lùi",
                      "Camera lùi",
                      "Camera 360",
                      "Cửa sổ trời",
                      "Ghế da",
                      "Ghế điện",
                      "Định vị GPS",
                      "Màn hình cảm ứng",
                      "Apple CarPlay",
                      "Android Auto",
                      "Lẫy chuyển số",
                      "Hỗ trợ đỗ xe",
                    ].map((feature) => (
                      <div className="feature-checkbox" key={feature}>
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          value={feature}
                          checked={carData.features.includes(feature)}
                          onChange={handleFeaturesChange}
                        />
                        <label htmlFor={`feature-${feature}`}>{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-section-title">Thông tin người bán</div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="seller.name">Tên người bán</label>
                  <input
                    type="text"
                    id="seller.name"
                    name="seller.name"
                    value={carData.seller.name}
                    onChange={handleChange}
                    placeholder="Nhập tên người bán"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller.phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="seller.phone"
                    name="seller.phone"
                    value={carData.seller.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller.location">Địa chỉ</label>
                  <input
                    type="text"
                    id="seller.location"
                    name="seller.location"
                    value={carData.seller.location}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" variant="secondary" onClick={handleCloseForm}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary">
                  {editingCar ? "Cập nhật" : "Thêm xe"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="cars-list-container">
            {filteredCars.length === 0 ? (
              <div className="no-cars">
                <p>Không tìm thấy xe nào phù hợp với từ khóa tìm kiếm.</p>
              </div>
            ) : (
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Hãng xe</th>
                    <th>Giá (VNĐ)</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Ngày đăng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car) => (
                    <tr key={car.id}>
                      <td>#{car.id.toString().slice(-4)}</td>
                      <td>{car.title}</td>
                      <td>{car.brand}</td>
                      <td>{formatPrice(car.price)}</td>
                      <td>{car.type === "new" ? "Xe mới" : "Xe cũ"}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(car.status)}`}>
                          {getStatusText(car.status)}
                        </span>
                      </td>
                      <td>{formatDate(car.createdAt)}</td>
                      <td className="action-buttons">
                        <button className="view-button" onClick={() => handleViewCar(car)} title="Xem chi tiết">
                          <FaEye />
                        </button>
                        <button className="edit-button" onClick={() => handleEditCar(car)} title="Chỉnh sửa">
                          <FaEdit />
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteCar(car.id)} title="Xóa">
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

        {selectedCar && (
          <div className="car-detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Chi tiết xe</h3>
                <button className="close-button" onClick={handleCloseDetail}>
                  ×
                </button>
              </div>

              <div className="car-detail">
                <div className="car-image">
                  <img src={selectedCar.images[0] || "/placeholder.svg"} alt={selectedCar.title} />
                </div>

                <div className="car-info">
                  <h4>{selectedCar.title}</h4>
                  <p className="car-id">ID: #{selectedCar.id.toString().slice(-4)}</p>

                  <div className="info-section">
                    <div className="info-row">
                      <span className="info-label">Hãng xe:</span>
                      <span className="info-value">{selectedCar.brand}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Mẫu xe:</span>
                      <span className="info-value">{selectedCar.model}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Năm sản xuất:</span>
                      <span className="info-value">{selectedCar.year}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Giá:</span>
                      <span className="info-value">{formatPrice(selectedCar.price)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Số km đã đi:</span>
                      <span className="info-value">{selectedCar.mileage} km</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Nhiên liệu:</span>
                      <span className="info-value">
                        {selectedCar.fuel === "gasoline"
                          ? "Xăng"
                          : selectedCar.fuel === "diesel"
                            ? "Dầu"
                            : selectedCar.fuel === "electric"
                              ? "Điện"
                              : "Hybrid"}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Hộp số:</span>
                      <span className="info-value">
                        {selectedCar.transmission === "automatic"
                          ? "Tự động"
                          : selectedCar.transmission === "manual"
                            ? "Số sàn"
                            : "CVT"}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Loại xe:</span>
                      <span className="info-value">{selectedCar.type === "new" ? "Xe mới" : "Xe cũ"}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Trạng thái:</span>
                      <span className={`status-badge ${getStatusBadgeClass(selectedCar.status)}`}>
                        {getStatusText(selectedCar.status)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Ngày đăng:</span>
                      <span className="info-value">{formatDate(selectedCar.createdAt)}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h5>Mô tả</h5>
                    <p className="car-description">{selectedCar.description}</p>
                  </div>

                  <div className="info-section">
                    <h5>Tính năng</h5>
                    <div className="car-features">
                      {selectedCar.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="info-section">
                    <h5>Thông tin người bán</h5>
                    <div className="info-row">
                      <span className="info-label">Tên:</span>
                      <span className="info-value">{selectedCar.seller.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Số điện thoại:</span>
                      <span className="info-value">{selectedCar.seller.phone}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Địa chỉ:</span>
                      <span className="info-value">{selectedCar.seller.location}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-actions">
                  <Button variant="secondary" onClick={handleCloseDetail}>
                    Đóng
                  </Button>
                  <Button variant="primary" onClick={() => handleEditCar(selectedCar)}>
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

export default memo(CarManagement)
