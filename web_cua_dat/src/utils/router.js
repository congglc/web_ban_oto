export const ADMIN_PATH = "/admin"

export const ROUTERS = {
  USER: {
    HOME: "/",
    CARS: "/cars",
    CAR_DETAIL: "/car",
    PRICE_LIST: "/price-list",
    DEALERSHIPS: "/dealerships",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    PROFILE: "/profile",
    MY_CARS: "/my-cars",
    SELL_CAR: "/sell-car",
    FAVORITES: "/favorites",
  },
  ADMIN: {
    LOGIN: `${ADMIN_PATH}/login`,
    DASHBOARD: `${ADMIN_PATH}/dashboard`,
    CARS: `${ADMIN_PATH}/cars`,
    USERS: `${ADMIN_PATH}/users`,
    DEALERSHIPS: `${ADMIN_PATH}/dealerships`,
  },
}
