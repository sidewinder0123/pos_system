import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roles from "./pages/role/Roles";
import EditRole from "./pages/role/EditRole";
import DeleteRole from "./pages/role/DeleteRole";
import Supplier from "./pages/supplier/Suppliers";
import Users from "./pages/user/Users";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/roles",
    element: (
      <ProtectedRoute>
        <Roles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/role/edit/:role_id",
    element: (
      <ProtectedRoute>
        <EditRole />
      </ProtectedRoute>
    ),
  },
  {
    path: "/role/delete/:role_id",
    element: (
      <ProtectedRoute>
        <DeleteRole />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/suppliers",
    element: (
      <ProtectedRoute>
        <Supplier />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
