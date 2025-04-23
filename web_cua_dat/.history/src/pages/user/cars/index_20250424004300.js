"use client"

import { memo, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ROUTERS } from "utils/router"
import Product from "..//..//../assets/user/img/lx.jpg"
import MasterLayout from "../theme/masterLayout"
import "./style.scss"
const CarsPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialType = queryParams.get("type") || "all"
  const searchQuery = queryParams.get("search") || ""

  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: initialType,
    brand: "",
    priceRange: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      const mockCars = [
        {
          id: 1,
          title: "Toyota Fortuner 2.7 AT 4x2",
          price: 1250000000,
          year: 2023,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hà Nội",
          image: Product,
          type: "used",
          brand: "toyota",
        },
        {
          id: 2,
          title: "Honda CR-V L 2022",
          price: 1090000000,
          year: 2022,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "TP HCM",
          image: Product,
          type: "used",
          brand: "honda",
        },
        {
          id: 3,
          title: "Ford Territory 1.5L Titanium",
          price: 849000000,
          year: 2025,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hưng Yên",
          image: Product,
          type: "new",
          brand: "ford",
        },
        {
          id: 4,
          title: "Hyundai Grand i10 1.2 MT",
          price: 360000000,
          year: 2023,
          transmission: "Số sàn",
          fuel: "Xăng",
          location: "Đà Nẵng",
          image: Product,
          type: "used",
          brand: "hyundai",
        },
        {
          id: 5,
          title: "Mazda CX-5 2.5 Signature Premium",
          price: 989000000,
          year: 2024,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hà Nội",
          image: Product,
          type: "new",
          brand: "mazda",
        },
        {
          id: 6,
          title: "Kia Seltos 1.4 Turbo Premium",
          price: 739000000,
          year: 2023,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "TP HCM",
          image: Product,
          type: "used",
          brand: "kia",
        },
        {
          id: 7,
          title: "Toyota Camry 2.5Q",
          price: 1420000000,
          year: 2024,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hải Phòng",
          image: Product,
          type: "new",
          brand: "toyota",
        },
        {
          id: 8,
          title: "Honda City RS",
          price: 609000000,
          year: 2023,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Đà Nẵng",
          image: Product,
          type: "used",
          brand: "honda",
        },
        {
          id: 9,
          title: "Mitsubishi Xpander Cross",
          price: 698000000,
          year: 2024,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Cần Thơ",
          image: Product,
          type: "new",
          brand: "mitsubishi",
        },
        {
          id: 10,
          title: "Hyundai Tucson 2.0 Đặc biệt",
          price: 865000000,
          year: 2023,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hà Nội",
          image: Product,
          type: "used",
          brand: "hyundai",
        },
        {
          id: 11,
          title: "Ford Ranger Wildtrak 2.0L AT 4x4",
          price: 965000000,
          year: 2024,
          transmission: "Số tự động",
          fuel: "Dầu",
          location: "TP HCM",
          image: Product,
          type: "new",
          brand: "ford",
        },
        {
          id: 12,
          title: "Kia Carnival Signature",
          price: 1349000000,
          year: 2023,
          transmission: "Số tự động",
          fuel: "Xăng",
          location: "Hà Nội",
          image:Product,
          type: "used",
          brand: "kia",
        },
      ]

      // Lưu vào localStorage để các trang khác có thể sử dụng
      localStorage.setItem("cars", JSON.stringify(mockCars))

      // Lọc xe theo các tiêu chí
      let filteredCars = mockCars

      // Lọc theo loại xe (mới/cũ)
      if (filters.type !== "all") {
        filteredCars = filteredCars.filter((car) => car.type === filters.type)
      }

      // Lọc theo hãng xe
      if (filters.brand) {
        filteredCars = filteredCars.filter((car) => car.brand === filters.brand)
      }

      // Lọc theo khoảng giá
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-")
        if (min && max) {
          filteredCars = filteredCars.filter(
            (car) => car.price >= Number(min) * 1000000 && car.price <= Number(max) * 1000000,
          )
        } else if (min === "0" && max) {
          filteredCars = filteredCars.filter((car) => car.price <= Number(max) * 1000000)
        } else if (min && !max) {
          filteredCars = filteredCars.filter((car) => car.price >= Number(min) * 1000000)
        }
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchQuery) {
        filteredCars = filteredCars.filter(
          (car) =>
            car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      setCars(filteredCars)
      setLoading(false)
    }, 500)
  }, [filters.type, filters.brand, filters.priceRange, searchQuery])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  return (
    <MasterLayout>
      <div className="cars-page">
        <div className="container">
          <div className="page-header">
            <h1>{filters.type === "new" ? "Ô TÔ MỚI" : filters.type === "used" ? "Ô TÔ CŨ" : "TẤT CẢ Ô TÔ"}</h1>
          </div>

          <div className="cars-container">
            <div className="filters-sidebar">
              <div className="filters-header">
                <h3>Bộ lọc</h3>
              </div>

              <div className="filter-section">
                <h4>Loại xe</h4>
                <div className="filter-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="type"
                      value="all"
                      checked={filters.type === "all"}
                      onChange={handleFilterChange}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="type"
                      value="new"
                      checked={filters.type === "new"}
                      onChange={handleFilterChange}
                    />
                    <span>Xe mới</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="type"
                      value="used"
                      checked={filters.type === "used"}
                      onChange={handleFilterChange}
                    />
                    <span>Xe cũ</span>
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h4>Hãng xe</h4>
                <select className="filter-select" name="brand" value={filters.brand} onChange={handleFilterChange}>
                  <option value="">Tất cả hãng xe</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="kia">Kia</option>
                  <option value="mazda">Mazda</option>
                  <option value="mitsubishi">Mitsubishi</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>Khoảng giá</h4>
                <select
                  className="filter-select"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả mức giá</option>
                  <option value="0-500">Dưới 500 triệu</option>
                  <option value="500-800">500 - 800 triệu</option>
                  <option value="800-1000">800 triệu - 1 tỷ</option>
                  <option value="1000-1500">1 tỷ - 1.5 tỷ</option>
                  <option value="1500">Trên 1.5 tỷ</option>
                </select>
              </div>
            </div>

            <div className="cars-content">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : cars.length === 0 ? (
                <div className="no-results">
                  <p>Không tìm thấy xe phù hợp với tiêu chí tìm kiếm.</p>
                  <button
                    className="reset-filters"
                    onClick={() => setFilters({ type: "all", brand: "", priceRange: "" })}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className="cars-grid">
                  {cars.map((car) => (
                    <div className="car-card" key={car.id}>
                      <Link to={`${ROUTERS.USER.CAR_DETAIL}/${car.id}`}>
                        <div className="car-image">
                          <img src={car.image || "/placeholder.svg"} alt={car.title} />
                          <span className={`car-type ${car.type}`}>{car.type === "new" ? "Xe mới" : "Xe cũ"}</span>
                        </div>
                        <div className="car-info">
                          <h3>{car.title}</h3>
                          <p className="car-price">{formatPrice(car.price)}</p>
                          <div className="car-specs">
                            <span>{car.year}</span>
                            <span>{car.transmission}</span>
                            <span>{car.fuel}</span>
                          </div>
                          <div className="car-location">{car.location}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  )
}

export default memo(CarsPage)
