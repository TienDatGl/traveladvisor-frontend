import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import 'react-perfect-scrollbar/dist/css/styles.css';
import RootLayout from "../src/layouts/RootLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import TripCreate from "./pages/TripCreate";
import UserProfile from "../src/components/UserProfile/UserProfile";
import LocationDetail from "./pages/LocationDetail";
import FavoriteLocations from "./pages/FavoriteLocations/FavoriteLocations";
import MyTrip from "./pages/MyTrip";
import SingleMytrip from "./components/My_Trip_Component/My_Trip_Detail/SingleMytrip";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MessengerCustomerChat from "react-messenger-customer-chat";
import AiTripCreate from "./pages/AiTripCreate";
import AITripResult from "./pages/AITripResult";


// ADMIN IMPORT
import Admin from "./components/Admin/Admin";
import AdminDashBoardTemplate from "./components/Admin/DashBoardContent/AdminDashBoardTemplate";
import AdminManageLocations from "./components/Admin/DashBoardContent/AdminManageLocations";
import AdminManageLocationDetail from "./components/Admin/DashBoardContent/AdminManageLocationDetail/AdminManageLocationDetail";
import AdminManageUsers from "./components/Admin/DashBoardContent/AdminManageUsers/AdminManageUsers";
import AdminCategoryManage from "./components/Admin/DashBoardContent/AdminManageTrips/AdminManageTrips";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SubscriptionPlan from "./pages/SubscriptionPlan";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="admin-dashboard/" element={<Admin />}>
        <Route index path="admin-DB" element={<AdminDashBoardTemplate />} />
        <Route index path="manage-locations" element={<AdminManageLocations />} />
        <Route index path="manage-location/:filterby" element={<AdminManageLocationDetail />} />
        <Route index path="manage-trips" element={<AdminCategoryManage />} />
        <Route index path="manage-users" element={<AdminManageUsers />} />
      </Route>
      <Route path="detail/:filterby" element={<LocationDetail />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="tripcreate" element={<TripCreate />} />
        <Route path="favorite" element={<FavoriteLocations />} />
        <Route path="mytrip" element={<MyTrip />} />
        <Route path="mytripdetail/:filterby" element={<SingleMytrip />} />
        <Route path="tripcreateAI" element={<AiTripCreate />} />
        <Route path="tripresultAI" element={<AITripResult />} />
        <Route path="UpgradePremium" element={< SubscriptionPlan />}></ Route>
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <MessengerCustomerChat
        pageId="100020569179614"
        appId="<1236615610645592>"
      />
    </>
  );
}

export default App;
