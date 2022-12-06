import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../components/home/Home";
import Header from "../components/header/Header";
import Stats from "../components/stats/Stats";
import NotFound from '../components/notfound/NotFound'

import 'react-toastify/dist/ReactToastify.css'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header/><Home/></>
  },
  {
    path: "/home",
    element: <><Header/><Home/></>
  },
  {
    path: "/stats",
    element: <><Header/><Stats/></>
  },
  {
    path: "/not-found",
    element: <><Header/><NotFound/></>
  },
  {
    path: "/*",
    element: <><Header/><NotFound/></>,
    errorElement: <><Header/><Home/></>
  },
]);