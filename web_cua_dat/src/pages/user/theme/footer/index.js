import { memo } from "react"
import "./style.scss"
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">OTO.COM.VN</h3>
            <p className="footer-description">Kênh thông tin mua bán, trao đổi ô tô uy tín, chất lượng</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Liên Hệ</h3>
            <ul className="footer-info">
              <li>
                <FaMapMarkerAlt className="icon" />
                <span>Tầng 29, Tòa nhà Trung tâm, Hà Nội</span>
              </li>
              <li>SĐT: 0123456789</li>
              <li>Email: info@oto.com.vn</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} OTO.COM.VN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
