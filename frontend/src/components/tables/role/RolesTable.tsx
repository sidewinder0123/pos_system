import { useEffect, useState } from "react";
import RoleService from "../../../services/RoleService";
import Spinner from "../../Spinner";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Link } from "react-router-dom";
import { Roles } from "../../../interfaces/Roles";

interface RolesTableProps {
  refreshRoles: boolean;
}

const RolesTable = ({ refreshRoles }: RolesTableProps) => {
  const [state, setState] = useState({
    loadingRoles: true,
    roles: [] as Roles[],
    unauthorized: false,
  });

  const loadRoles = () => {
    RoleService.loadRoles()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            roles: res.data.roles,
            unauthorized: false,
          }));
        }
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          setState((prevState) => ({
            ...prevState,
            unauthorized: true,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingRoles: false,
        }));
      });
  };

  useEffect(() => {
    loadRoles();
  }, [refreshRoles]);

  return (
    <table className="table table-hover">
      <thead>
        <tr className="align-middle">
          <th>No.</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {state.loadingRoles ? (
          <tr>
            <td colSpan={3} className="text-center">
              <Spinner />
            </td>
          </tr>
        ) : state.unauthorized ? (
          <tr>
            <td colSpan={3} className="text-center text-danger fw-bold">
              You don't have access!
            </td>
          </tr>
        ) : state.roles.length > 0 ? (
          state.roles.map((role, index) => (
            <tr key={index} className="align-middle">
              <td>{index + 1}</td>
              <td>{role.role}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`/role/edit/${role.role_id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/role/delete/${role.role_id}`}
                    className="btn btn-danger"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              No roles found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RolesTable;
