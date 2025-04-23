import { Route, Routes, useLocation } from "react-router-dom"
import { ADMIN_PATH, ROUTERS } from "./utils/router"

// User Pages
import HomePage from "./pages/user/homepages"
import CarsPage from "./pages/user/cars"
import CarDetailPage from "./pages/user/car-detail"
import PriceListPage from "./pages/user/price-list"
import DealershipsPage from "./pages/user/dealerships"
import SigninPage from "./pages/user/form/signin"
import SignupPage from "./pages/user/form/signup"

// Admin Pages
import Login from "pages/admin/login"
import Dashboard from "pages/admin/dashboard"
import Cars from "pages/admin/cars"
import Users from "pages/admin/users"
import Dealerships from "pages/admin/dealerships"

const renderUserRouter = () => {
  const UserRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.CARS,
      component: <CarsPage />,
    },
    {
      path: `${ROUTERS.USER.CAR_DETAIL}/:id`,
      component: <CarDetailPage />,
    },
    {
      path: ROUTERS.USER.PRICE_LIST,
      component: <PriceListPage />,
    },
    {
      path: ROUTERS.USER.DEALERSHIPS,
      component: <DealershipsPage />,
    },
    {
      path: ROUTERS.USER.SIGNIN,
      component: <SigninPage />,
    },
    {
      path: ROUTERS.USER.SIGNUP,
      component: <SignupPage />,
    },
  ]
  return (
    <Routes>
      {UserRouters.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
      ))}
    </Routes>
  )
}

const renderAdminRouter = () => {
  const AdminRouters = [
    {
      path: ROUTERS.ADMIN.LOGIN,
      component: <Login />,
    },
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: <Dashboard />,
    },
    {
      path: ROUTERS.ADMIN.CARS,
      component: <Cars />,
    },
    {
      path: ROUTERS.ADMIN.USERS,
      component: <Users />,
    },
    {
      path: ROUTERS.ADMIN.DEALERSHIPS,
      component: <Dealerships />,
    },
  ]
  return (
    <Routes>
      {AdminRouters.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
      ))}
    </Routes>
  )
}

const RouterCustom = () => {
  const location = useLocation()
  const isAdminRouter = location.pathname.startsWith(ADMIN_PATH)

  return isAdminRouter ? renderAdminRouter() : renderUserRouter()
}

export default RouterCustom
