import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";
import Spinner from "../../Spinner";
import SpinnerSmall from "../../SpinnerSmall";

interface DeleteRoleFormProps {
  onDeleteRole: (message: string) => void;
}

const DeleteRoleForm = ({ onDeleteRole }: DeleteRoleFormProps) => {
  const { role_id } = useParams();

  const [state, setState] = useState({
    loadingGet: true,
    loadingDestroy: false,
    role_id: 0,
    role: "",
  });

  const handleGetRole = (roleId: number) => {
    RoleService.getRole(roleId)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            role_id: res.data.role.role_id,
            role: res.data.role.role,
          }));
        } else {
          console.error(
            "Unexpected status error while getting role: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingGet: false,
        }));
      });
  };

  const handleDestroyRole = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingDestroy: true,
    }));

    RoleService.destroyRole(state.role_id)
      .then((res) => {
        if (res.status === 200) {
          onDeleteRole(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying role: ",
            res.status
          );
        }
      })
      .catch((error) => {
        console.error(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingDestroy: false,
        }));
      });
  };

  useEffect(() => {
    if (role_id) {
      const parsedRoleId = parseInt(role_id);
      handleGetRole(parsedRoleId);
    } else {
      console.error("Invalid role_id: ", role_id);
    }
  }, [role_id]);

  return (
    <>
      {state.loadingGet ? (
        <div className="text-center mt-5">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleDestroyRole}>
          <h3>Are you sure you want to delete this role?</h3>
          <div className="form-group">
            <div className="mb-3">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                id="role"
                value={state.role}
                readOnly
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link
                to={"/"}
                className={`btn btn-secondary me-1 ${
                  state.loadingDestroy ? "disabled" : ""
                }`}
              >
                Back
              </Link>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={state.loadingDestroy}
              >
                {state.loadingDestroy ? (
                  <>
                    <SpinnerSmall /> Deleting...
                  </>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default DeleteRoleForm;
