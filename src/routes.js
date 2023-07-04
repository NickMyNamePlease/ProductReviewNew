import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Main from "./pages/Main";
import Product from "./pages/Product";
import Auth from "./pages/Auth";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: USER_ROUTE,
        Component: User
    }
]

export const userRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: USER_ROUTE,
        Component: User
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]