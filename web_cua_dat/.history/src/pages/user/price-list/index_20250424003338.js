"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import MasterLayout from "../theme/masterLayout"
import { FaCarAlt } from "react-icons/fa"

const PriceList = () => {
  const [carBrands, setCarBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [carModels, setCarModels] = useState([])
  const [loading, setLoading] = useState(false)

  // Mock data for car brands
  const mockBrands = [
    { id: 1, name: "Toyota", logo: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Honda", logo: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Ford", logo: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Hyundai", logo: "/placeholder.svg?height=80&width=80" },
  ]

  // Mock data for car models
  const mockCarModels = {
    Toyota: [
      { id: 1, name: "Vios", price: 478000000, image: "/placeholder.svg?height=150&width=250" },
      { id: 2, name: "Corolla Cross", price: 820000000, image: "/placeholder.svg?height=150&width=250" },
      { id: 3, name: "Fortuner", price: 1026000000, image: "/placeholder.svg?height=150&width=250" },
    ],
    Honda: [
      { id: 1, name: "City", price: 559000000, image: "/placeholder.svg?height=150&width=250" },
      { id: 2, name: "CR-V", price: 998000000, image: "/placeholder.svg?height=150&width=250" },
    ],
    Ford: [
      { id: 1, name: "Ranger", price: 659000000, image: "/placeholder.svg?height=150&width=250" },
      { id: 2, name: "Territory", price: 822000000, image: "/placeholder.svg?height=150&width=250" },
    ],
    Hyundai: [
      { id: 1, name: "Accent", price: 426000000, image: "/placeholder.svg?height=150&width=250" },
      { id: 2, name: "Santa Fe", price: 1055000000, image: "/placeholder.svg?height=150&width=250" },
    ],
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setCarBrands(mockBrands)
  }, [])

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand)
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCarModels(mockCarModels[brand.name] || [])
      setLoading(false)
    }, 500)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  return (
    <MasterLayout>
      <div className="price-list-page">
        <div className="container">
          <div className="page-header">
            <h1>
              Bảng giá xe ô tô tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}
            </h1>
            <p>
              Cập nhật bảng giá xe tháng {new Date().getMonth() + 1}/{new Date().getFullYear()} của các hãng tại Việt
              Nam
            </p>
          </div>

          <div className="brand-grid">
            {carBrands.map((brand) => (
              <div
                key={brand.id}
                className={`brand-card ${selectedBrand?.id === brand.id ? "active" : ""}`}
                onClick={() => handleBrandClick(brand)}
              >
                <div className="brand-logo">
                  <img src={brand.logo || "/placeholder.svg"} alt={brand.name} />
                </div>
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>

          {selectedBrand && (
            <div className="car-models-section">
              <h2>Giá xe {selectedBrand.name}</h2>

              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : carModels.length === 0 ? (
                <div className="no-models">
                  <p>Không có dữ liệu về các mẫu xe {selectedBrand.name}.</p>
                </div>
              ) : (
                <div className="car-models-grid">
                  {carModels.map((model) => (
                    <div className="car-model-card" key={model.id}>
                      <div className="model-image">
                        <img src={model.image || "/placeholder.svg"} alt={model.name} />
                      </div>
                      <div className="model-info">
                        <h3>
                          {selectedBrand.name} {model.name}
                        </h3>
                        <p className="model-price">{formatPrice(model.price)}</p>
                        <Link
                          to={`${ROUTERS.USER.CARS}?brand=${selectedBrand.name}&model=${model.name}`}
                          className="view-button"
                        >
                          <FaCarAlt className="button-icon" />
                          Xem xe
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MasterLayout>
  )
}

export default memo(PriceList)
