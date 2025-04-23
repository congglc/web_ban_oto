"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { FaClock, FaSearch, FaTags } from "react-icons/fa"

const News = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // Mock data for articles
  const mockArticles = [
    {
      id: 1,
      title: "Đánh giá xe Honda CR-V 2022: Công nghệ không phải làm màu mà để dẫn đầu",
      excerpt:
        "Honda CR-V 2022 là một trong những mẫu SUV được ưa chuộng nhất tại Việt Nam với thiết kế hiện đại, trang bị công nghệ cao cấp và khả năng vận hành mạnh mẽ.",
      image: "honda-crv-review.jpg",
      date: "2023-04-15T08:30:00Z",
      author: "Minh Tuấn",
      category: "Đánh giá xe",
      tags: ["Honda", "CR-V", "SUV", "Đánh giá"],
    },
    {
      id: 2,
      title: "Ford Territory 2025 ra mắt tại Việt Nam, giá từ 822 triệu đồng",
      excerpt:
        "Ford Territory 2025 vừa chính thức ra mắt thị trường Việt Nam với nhiều nâng cấp về thiết kế, công nghệ và tính năng an toàn.",
      image: "ford-territory-launch.jpg",
      date: "2023-04-10T10:15:00Z",
      author: "Hoàng Nam",
      category: "Tin tức",
      tags: ["Ford", "Territory", "SUV", "Ra mắt"],
    },
    {
      id: 3,
      title: "Mua xe trả góp: Những điều cần biết để không bị 'hớ'",
      excerpt:
        "Mua xe trả góp là hình thức phổ biến hiện nay, nhưng không phải ai cũng nắm rõ các thủ tục và điều kiện để tránh những rủi ro không đáng có.",
      image: "car-loan.jpg",
      date: "2023-04-05T09:45:00Z",
      author: "Thu Hà",
      category: "Tư vấn",
      tags: ["Mua xe", "Trả góp", "Tài chính", "Tư vấn"],
    },
    {
      id: 4,
      title: "So sánh Toyota Vios và Honda City: Cuộc chiến sedan hạng B",
      excerpt:
        "Toyota Vios và Honda City là hai đối thủ 'không đội trời chung' trong phân khúc sedan hạng B tại Việt Nam. Cùng so sánh hai mẫu xe này để tìm ra lựa chọn phù hợp nhất.",
      image: "vios-vs-city.jpg",
      date: "2023-04-01T14:20:00Z",
      author: "Quang Huy",
      category: "So sánh",
      tags: ["Toyota", "Vios", "Honda", "City", "Sedan", "So sánh"],
    },
    {
      id: 5,
      title: "5 mẫu xe SUV tiết kiệm nhiên liệu nhất năm 2023",
      excerpt:
        "Với giá xăng dầu tăng cao, việc lựa chọn một mẫu SUV tiết kiệm nhiên liệu là ưu tiên hàng đầu của nhiều người dùng. Dưới đây là 5 mẫu xe SUV tiết kiệm nhiên liệu nhất năm 2023.",
      image: "fuel-efficient-suvs.jpg",
      date: "2023-03-28T11:30:00Z",
      author: "Minh Tuấn",
      category: "Tư vấn",
      tags: ["SUV", "Tiết kiệm nhiên liệu", "Tư vấn"],
    },
    {
      id: 6,
      title: "VinFast VF 8 xuất khẩu sang thị trường Mỹ, mở đầu kỷ nguyên ô tô điện Việt",
      excerpt:
        "Lô xe VinFast VF 8 đầu tiên đã được xuất khẩu sang thị trường Mỹ, đánh dấu bước ngoặt quan trọng của ngành công nghiệp ô tô Việt Nam.",
      image: "vinfast-export.jpg",
      date: "2023-03-25T16:45:00Z",
      author: "Hoàng Nam",
      category: "Tin tức",
      tags: ["VinFast", "VF 8", "Ô tô điện", "Xuất khẩu"],
    },
  ]

  const categories = [
    { value: "", label: "Tất cả danh mục" },
    { value: "Tin tức", label: "Tin tức" },
    { value: "Đánh giá xe", label: "Đánh giá xe" },
    { value: "Tư vấn", label: "Tư vấn" },
    { value: "So sánh", label: "So sánh" },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setArticles(mockArticles)
      setFilteredArticles(mockArticles)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    // Filter articles based on search term and category
    let filtered = [...articles]

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory, articles])

  const handleSearch = (e) => {
    e.preventDefault()
    // Already handled by useEffect
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="news-page">
      <div className="container">
        <div className="page-header">
          <h1>TIN TỨC Ô TÔ</h1>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch}>
            <div className="search-input">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </div>

            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="no-results">
            <p>Không tìm thấy tin tức phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <div className="article-card" key={article.id}>
                <Link to={`${ROUTERS.USER.NEWS_DETAIL}/${article.id}`} className="article-image">
                  <img src={`/news/${article.image}`} alt={article.title} />
                  <span className="article-category">{article.category}</span>
                </Link>
                <div className="article-content">
                  <Link to={`${ROUTERS.USER.NEWS_DETAIL}/${article.id}`} className="article-title">
                    <h2>{article.title}</h2>
                  </Link>
                  <div className="article-meta">
                    <span className="article-date">
                      <FaClock className="meta-icon" />
                      {formatDate(article.date)}
                    </span>
                    <span className="article-author">{article.author}</span>
                  </div>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-tags">
                    <FaTags className="tags-icon" />
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        {index < article.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <Link to={`${ROUTERS.USER.NEWS_DETAIL}/${article.id}`} className="read-more">
                    Đọc tiếp
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(News)
