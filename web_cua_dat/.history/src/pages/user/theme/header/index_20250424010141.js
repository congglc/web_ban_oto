"use client"

import { memo, useEffect, useRef, useState } from "react"
import { FaSearch, FaUser } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ROUTERS } from "utils/router"
import lg from "..//..//..//../assets/user/img/lg.jpg"
import "./style.scss"
const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [menu] = useState([
    { name: "Ô TÔ CŨ", path: `${ROUTERS.USER.CARS}?type=used` },
    { name: "Ô TÔ MỚI", path: `${ROUTERS.USER.CARS}?type=new` },
    { name: "GIÁ XE Ô TÔ", path: ROUTERS.USER.PRICE_LIST },
    { name: "DANH BẠ", path: ROUTERS.USER.DEALERSHIPS },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const headerRef = useRef(null)
  const dropdownRef = useRef(null)

  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo")
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("userInfo")
    setUserInfo(null)
    setShowDropdown(false)

    // Chuyển hướng về trang chủ
    navigate(ROUTERS.USER.HOME)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`${ROUTERS.USER.CARS}?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }

  // Xử lý click bên ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isOpen) {
        setIsOpen(false)
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showDropdown) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, showDropdown])

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Mở menu">
        ☰
      </button>
      <header className={`header ${isOpen ? "open" : ""}`} ref={headerRef}>
        <div className="container">
          <div className="header-top">
            <img src={lg} style={{width:'50px',height:'50%'}}/>

            <div className="header-search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo hãng xe, dòng xe"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="header-actions">
              {userInfo ? (
                <div className="user-profile" ref={dropdownRef}>
                  <div className="avatar" onClick={toggleDropdown}>
                    <FaUser className="avatar-icon" />
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <button className="dropdown-item logout-button" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-links">
                  <Link to={ROUTERS.USER.SIGNIN} className="signin-link">
                    Đăng nhập
                  </Link>
                  <Link to={ROUTERS.USER.SIGNUP} className="signup-link">
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>

          <nav className="header-nav">
            <ul>
              {menu?.map((menuItem, menuKey) => {
                return (
                  <li key={menuKey} className={location.pathname === menuItem.path ? "active" : ""}>
                    <Link to={menuItem?.path}>{menuItem?.name}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
export default memo(Header)
