"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import MasterLayout from "../theme/masterLayout"
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa"

const Dealerships = () => {
  const [dealerships, setDealerships] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState("")

  // Mock data for dealerships
  const mockDealerships = [
    {
      id: 1,
      name: "LEXUS LƯỚT SÀI GÒN",
      type: "Đại lý chính hãng",
      address: "463A & 463B Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP HCM",
      phone: "0767 8** ***",
      rating: 0,
      reviews: 0,
      city: "TP HCM",
      carsCount: 12,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "SÀN Ô TÔ HÀ NỘI",
      type: "Salon xe cũ",
      address: "19 Lê Văn Lương, Quận Thanh Xuân, Hà Nội",
      phone: "0916 1** ***",
      rating: 4.5,
      reviews: 3,
      city: "Hà Nội",
      carsCount: 95,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "TUẤN KIỆT AUTO",
      type: "Salon xe cũ",
      address: "The Manor Central Park, Nguyễn Xiển, Quận Hoàng Mai, Hà Nội",
      phone: "0944 3** ***",
      rating: 4.4,
      reviews: 26,
      city: "Hà Nội",
      carsCount: 35,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "SIÊU THỊ Ô TÔ HÀ NỘI",
      type: "Salon xe cũ",
      address: "389 QL 13, Hiệp Bình Phước, Thủ Đức, Tp Hồ Chí Minh",
      phone: "0902 8** ***",
      rating: 4.2,
      reviews: 10,
      city: "TP HCM",
      carsCount: 42,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const cities = [
    { value: "", label: "Tất cả tỉnh thành" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "TP HCM", label: "TP HCM" },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setDealerships(mockDealerships)
      setLoading(false)
    }, 500)
  }, [])

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }

  const filteredDealerships = selectedCity
    ? dealerships.filter((dealership) => dealership.city === selectedCity)
    : dealerships

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star filled" />)
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half-filled" />)
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />)
    }

    return stars
  }

  return (
    <MasterLayout>
      <div className="dealerships-page">
        <div className="container">
          <div className="page-header">
            <h1>DANH BẠ SHOWROOM Ô TÔ</h1>
            <p>Có {filteredDealerships.length} salon</p>
          </div>

          <div className="search-section">
            <div className="filter-selects">
              <select value={selectedCity} onChange={handleCityChange} className="filter-select">
                {cities.map((city, index) => (
                  <option key={index} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : filteredDealerships.length === 0 ? (
            <div className="no-results">
              <p>Không tìm thấy showroom phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          ) : (
            <div className="dealerships-grid">
              {filteredDealerships.map((dealership) => (
                <div className="dealership-card" key={dealership.id}>
                  <div className="dealership-image">
                    <img src={dealership.image || "/placeholder.svg"} alt={dealership.name} />
                  </div>
                  <div className="dealership-info">
                    <h2 className="dealership-name">{dealership.name}</h2>

                    <div className="dealership-rating">
                      <div className="rating-stars">
                        {dealership.reviews > 0 ? (
                          <>
                            {renderRatingStars(dealership.rating)}
                            <span className="reviews-count">({dealership.reviews} đánh giá)</span>
                          </>
                        ) : (
                          <span className="no-reviews">(chưa có đánh giá)</span>
                        )}
                      </div>
                      <div className="dealership-type">{dealership.type}</div>
                    </div>

                    <div className="dealership-address">
                      <FaMapMarkerAlt className="address-icon" />
                      <p>{dealership.address}</p>
                    </div>

                    <div className="dealership-actions">
                      <a href={`tel:${dealership.phone}`} className="phone-button">
                        <FaPhoneAlt className="phone-icon" />
                        {dealership.phone}
                      </a>

                      <Link to={`${ROUTERS.USER.CARS}?dealership=${dealership.id}`} className="cars-button">
                        {dealership.carsCount} xe đang bán
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MasterLayout>
  )
}

export default memo(Dealerships)
