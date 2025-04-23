"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import MasterLayout from "../theme/masterLayout"

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)

    // Dữ liệu mẫu cho xe nổi bật
    const mockCars = [
      {
        id: 1,
        title: "Toyota Fortuner 2.7 AT 4x2",
        price: 1250000000,
        year: 2023,
        image: "/placeholder.svg?height=200&width=300",
        type: "used",
      },
      {
        id: 2,
        title: "Honda CR-V L 2022",
        price: 1090000000,
        year: 2022,
        image: "/placeholder.svg?height=200&width=300",
        type: "used",
      },
      {
        id: 3,
        title: "Ford Territory 1.5L Titanium",
        price: 849000000,
        year: 2025,
        image: "/placeholder.svg?height=200&width=300",
        type: "new",
      },
      {
        id: 4,
        title: "Hyundai Grand i10 1.2 MT",
        price: 360000000,
        year: 2023,
        image: "/placeholder.svg?height=200&width=300",
        type: "used",
      },
    ]

    setFeaturedCars(mockCars)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  return (
    <MasterLayout>
      <div className="homepage">
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="search-container">
            <h2>Tìm chiếc xe dành cho bạn</h2>
            <form>
              <div className="search-form">
                <select>
                  <option value="">Chọn hãng xe</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                  <option value="hyundai">Hyundai</option>
                </select>
                <select>
                  <option value="">Chọn dòng xe</option>
                </select>
                <button type="submit" className="search-button">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <div className="link-item">
            <Link to={`${ROUTERS.USER.CARS}?type=used`}>
              <span>Ô tô cũ</span>
            </Link>
          </div>
          <div className="link-item">
            <Link to={`${ROUTERS.USER.CARS}?type=new`}>
              <span>Ô tô mới</span>
            </Link>
          </div>
          <div className="link-item">
            <Link to={ROUTERS.USER.PRICE_LIST}>
              <span>Giá xe</span>
            </Link>
          </div>
          <div className="link-item">
            <Link to={ROUTERS.USER.DEALERSHIPS}>
              <span>Đại lý</span>
            </Link>
          </div>
        </div>

        {/* Featured Cars */}
        <div className="featured-cars">
          <h2>XE NỔI BẬT</h2>
          <div className="car-grid">
            {featuredCars.map((car) => (
              <div className="car-card" key={car.id}>
                <Link to={`${ROUTERS.USER.CAR_DETAIL}/${car.id}`}>
                  <div className="car-image">
                    <img src={car.image || "/placeholder.svg"} alt={car.title} />
                    <span className={`car-type ${car.type}`}>{car.type === "new" ? "Xe mới" : "Xe cũ"}</span>
                  </div>
                  <div className="car-info">
                    <h3>{car.title}</h3>
                    <div className="car-price">{formatPrice(car.price)}</div>
                    <div className="car-year">Năm SX: {car.year}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="view-more">
            <Link to={ROUTERS.USER.CARS} className="view-more-button">
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </MasterLayout>
  )
}

export default memo(HomePage)
