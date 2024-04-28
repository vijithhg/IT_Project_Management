import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DeveloperDashboard from "./components/developer/DeveloperDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProtection from "../middleware/AdminProtection";
import ManagerProtection from "../middleware/ManagerProtection";
import DeveloperProtection from "../middleware/DeveloperProtection";
import AddManagers from "./components/admin/AddManger";
import AddDevelopers from "./components/admin/AddDevelopers";
import ResetPassword from "./components/auth/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminProtection />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manager-reg" element={<AddManagers/>}/>
          <Route path="/admin/dev-reg" element={<AddDevelopers/>}/>
        </Route>
        <Route path="/" element={<Login />} />
        <Route element={<ManagerProtection/>}>
          <Route path="/manager" element={<ManagerDashboard />} />
        </Route>
        <Route element={<DeveloperProtection/>}>
          
        </Route>
        <Route path="/developer" element={<DeveloperDashboard />} />
        <Route path="/reset-password" element={<ResetPassword/>}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
