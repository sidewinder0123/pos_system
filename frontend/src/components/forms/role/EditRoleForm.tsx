import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";
import Spinner from "../../Spinner";
import { RoleFieldErrors } from "../../../interfaces/RoleFieldErrors";
import SpinnerSmall from "../../SpinnerSmall";

interface EditRoleFormProps {
  onRoleUpdate: (message: string) => void;
}

const EditRoleForm = ({ onRoleUpdate }: EditRoleFormProps) => {
  const { role_id } = useParams();

  const [state, setState] = useState({
    loadingGet: true,
    loadingUpdate: false,
    role_id: 0,
    role: "",
    errors: {} as RoleFieldErrors,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetRole = (roleId: number) => {
    setState((prevState) => ({
      ...prevState,
      loadingGet: true,
    }));

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

  const handleUpdateRole = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingUpdate: true,
    }));

    RoleService.updateRole(state.role_id, state)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            errors: {} as RoleFieldErrors,
          }));

          onRoleUpdate(res.data.message);
        } else {
          console.error(
            "Unexpected status error while updating role: ",
            res.status
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingUpdate: false,
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
        <form onSubmit={handleUpdateRole}>
          <div className="form-group">
            <div className="mb-3">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.role ? "is-invalid" : ""
                }`}
                name="role"
                id="role"
                value={state.role}
                onChange={handleInputChange}
              />
              {state.errors.role && (
                <p className="text-danger">{state.errors.role[0]}</p>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link to={"/roles"} className="btn btn-secondary me-1">
                Back
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.loadingUpdate}
              >
                {state.loadingUpdate ? (
                  <>
                    <SpinnerSmall /> Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditRoleForm;
