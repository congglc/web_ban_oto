"use client"

import { memo, useEffect, useState } from "react"
import { FaCalendarAlt, FaCar, FaGasPump, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { ROUTERS } from "utils/router"
import Product from "..//..//../assets/user/img/lx.jpg"
import MasterLayout from "../theme/masterLayout"
import "./style.scss"
const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPhone, setShowPhone] = useState(false)

  // Mock data for car details
  const mockCars = [
    {
      id: "1",
      title: "Toyota Fortuner 2.7 AT 4x2 2023",
      price: 1250000000,
      images: Product,
      type: "used",
      year: 2023,
      brand: "Toyota",
      model: "Fortuner",
      transmission: "Số tự động",
      fuel: "Xăng",
      mileage: 15000,
      location: "Hà Nội",
      color: "Trắng",
      seats: 7,
      engine: "2.7L",
      description:
        "Toyota Fortuner 2.7 AT 4x2 sản xuất 2023, xe đẹp như mới, đi 15.000km. Xe được trang bị: Động cơ xăng 2.7L, hộp số tự động 6 cấp, ghế da, màn hình DVD, camera lùi, cảm biến trước sau, điều hòa tự động 2 vùng, đèn pha LED.",
      features: [
        "Động cơ 2.7L Dual VVT-i",
        "Hộp số tự động 6 cấp",
        "Ghế da cao cấp",
        "Màn hình giải trí 8 inch",
        "Camera lùi",
      ],
      seller: {
        name: "Anh Tuấn",
        phone: "0912345678",
        type: "Cá nhân",
      },
    },
    {
      id: "2",
      title: "Honda CR-V L 2022",
      price: 1090000000,
      images:Product,
      type: "used",
      year: 2022,
      brand: "Honda",
      model: "CR-V",
      transmission: "Số tự động",
      fuel: "Xăng",
      mileage: 20000,
      location: "TP HCM",
      color: "Đen",
      seats: 5,
      engine: "1.5L Turbo",
      description:
        "Honda CR-V L sản xuất 2022, xe đẹp như mới, đi 20.000km. Xe được trang bị: Động cơ xăng 1.5L Turbo, hộp số tự động vô cấp CVT, ghế da, màn hình cảm ứng 7 inch, camera lùi, cảm biến trước sau.",
      features: [
        "Động cơ 1.5L VTEC Turbo",
        "Hộp số tự động vô cấp CVT",
        "Ghế da cao cấp",
        "Màn hình cảm ứng 7 inch",
        "Camera lùi",
      ],
      seller: {
        name: "Chị Hương",
        phone: "0987654321",
        type: "Cá nhân",
      },
    },
    {
      id: "3",
      title: "Ford Territory 1.5L Titanium 2025",
      price: 849000000,
      images: Product,
      type: "new",
      year: 2025,
      brand: "Ford",
      model: "Territory",
      transmission: "Số tự động",
      fuel: "Xăng",
      mileage: 0,
      location: "Hưng Yên",
      color: "Đen",
      seats: 5,
      engine: "1.5L Turbo",
      description:
        "Ford Territory 1.5L Titanium 2025 - Ưu đãi đặc biệt các phiên bản, giá tốt, sẵn xe giao ngay. Xe mới 100%, đủ màu, đủ phiên bản. Hỗ trợ trả góp lên đến 80% giá trị xe, thời gian vay tối đa 8 năm.",
      features: [
        "Động cơ 1.5L EcoBoost",
        "Hộp số tự động 7 cấp",
        "Màn hình cảm ứng 12 inch",
        "Camera 360 độ",
        "Cửa sổ trời toàn cảnh",
      ],
      seller: {
        name: "Đại lý Ford Hưng Yên",
        phone: "0967930289",
        type: "Đại lý",
      },
    },
    {
      id: "4",
      title: "Hyundai Grand i10 1.2 MT 2023",
      price: 360000000,
      images:Product,
      type: "used",
      year: 2023,
      brand: "Hyundai",
      model: "Grand i10",
      transmission: "Số sàn",
      fuel: "Xăng",
      mileage: 8000,
      location: "Đà Nẵng",
      color: "Đỏ",
      seats: 5,
      engine: "1.2L",
      description:
        "Hyundai Grand i10 1.2 MT sản xuất 2023, xe đẹp như mới, đi 8.000km. Xe được trang bị: Động cơ xăng 1.2L, hộp số sàn 5 cấp, màn hình giải trí, camera lùi, cảm biến lùi.",
      features: ["Động cơ 1.2L", "Hộp số sàn 5 cấp", "Màn hình giải trí", "Camera lùi", "Cảm biến lùi"],
      seller: {
        name: "Anh Hùng",
        phone: "0923456789",
        type: "Cá nhân",
      },
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      const foundCar = mockCars.find((car) => car.id === id)
      setCar(foundCar || null)
      setLoading(false)
    }, 500)
  }, [id])

  const handleShowPhone = () => {
    setShowPhone(true)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  if (loading) {
    return (
      <MasterLayout>
        <div className="car-detail-page">
          <div className="container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải thông tin xe...</p>
            </div>
          </div>
        </div>
      </MasterLayout>
    )
  }

  if (!car) {
    return (
      <MasterLayout>
        <div className="car-detail-page">
          <div className="container">
            <div className="not-found">
              <h2>Không tìm thấy thông tin xe</h2>
              <p>Xe bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <Link to={ROUTERS.USER.CARS} className="back-button">
                Quay lại danh sách xe
              </Link>
            </div>
          </div>
        </div>
      </MasterLayout>
    )
  }

  return (
    <MasterLayout>
      <div className="car-detail-page">
        <div className="container">
          <div className="breadcrumb">
            <Link to={ROUTERS.USER.HOME}>Trang chủ</Link>
            <span>/</span>
            <Link to={ROUTERS.USER.CARS}>Xe ô tô</Link>
            <span>/</span>
            <span className="current">{car.title}</span>
          </div>

          <div className="car-detail-container">
            <div className="car-gallery">
              <div className="main-image">
                <img src={car.images[0] || Product} alt={car.title} />
                <span className={`car-type ${car.type}`}>{car.type === "new" ? "Xe mới" : "Xe cũ"}</span>
              </div>
            </div>

            <div className="car-info">
              <h1 className="car-title">{car.title}</h1>
              <div className="car-price">{formatPrice(car.price)}</div>

              <div className="car-specs">
                <div className="spec-item">
                  <FaCalendarAlt className="spec-icon" />
                  <div className="spec-content">
                    <span className="spec-label">Năm sản xuất</span>
                    <span className="spec-value">{car.year}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <FaCar className="spec-icon" />
                  <div className="spec-content">
                    <span className="spec-label">Hộp số</span>
                    <span className="spec-value">{car.transmission}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <FaGasPump className="spec-icon" />
                  <div className="spec-content">
                    <span className="spec-label">Nhiên liệu</span>
                    <span className="spec-value">{car.fuel}</span>
                  </div>
                </div>
              </div>

              <div className="car-location">
                <FaMapMarkerAlt className="location-icon" />
                <span>{car.location}</span>
              </div>

              <div className="seller-info">
                <div className="seller-header">
                  <div className="seller-details">
                    <h3 className="seller-name">{car.seller.name}</h3>
                    <p className="seller-type">{car.seller.type}</p>
                  </div>
                </div>

                <div className="seller-contact">
                  {showPhone ? (
                    <a href={`tel:${car.seller.phone}`} className="phone-button">
                      <FaPhoneAlt className="phone-icon" />
                      {car.seller.phone}
                    </a>
                  ) : (
                    <button className="phone-button" onClick={handleShowPhone}>
                      <FaPhoneAlt className="phone-icon" />
                      Hiện số điện thoại
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="car-details-tabs">
            <div className="tab-content">
              <div className="detail-section">
                <h2>Thông tin chi tiết</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Hãng xe</span>
                    <span className="detail-value">{car.brand}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dòng xe</span>
                    <span className="detail-value">{car.model}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Năm sản xuất</span>
                    <span className="detail-value">{car.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Số chỗ ngồi</span>
                    <span className="detail-value">{car.seats}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Màu sắc</span>
                    <span className="detail-value">{car.color}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Nhiên liệu</span>
                    <span className="detail-value">{car.fuel}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Động cơ</span>
                    <span className="detail-value">{car.engine}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Hộp số</span>
                    <span className="detail-value">{car.transmission}</span>
                  </div>
                  {car.type === "used" && (
                    <div className="detail-item">
                      <span className="detail-label">Số km đã đi</span>
                      <span className="detail-value">{car.mileage.toLocaleString()} km</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h2>Mô tả</h2>
                <div className="description">
                  <p>{car.description}</p>
                </div>
              </div>

              <div className="detail-section">
                <h2>Tính năng</h2>
                <div className="features-list">
                  {car.features.map((feature, index) => (
                    <div className="feature-item" key={index}>
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  )
}

export default memo(CarDetail)
