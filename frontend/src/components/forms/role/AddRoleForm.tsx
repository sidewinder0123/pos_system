import { ChangeEvent, FormEvent, useState } from "react";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { RoleFieldErrors } from "../../../interfaces/RoleFieldErrors";
import SpinnerSmall from "../../SpinnerSmall";

interface AddRoleFormProps {
  onRoleAdded: (message: string) => void;
}

const AddRoleForm = ({ onRoleAdded }: AddRoleFormProps) => {
  const [state, setState] = useState({
    loadingStore: false,
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

  const handleStoreRole = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingStore: true,
    }));

    RoleService.storeRole(state)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            role: "",
            errors: {} as RoleFieldErrors,
          }));

          onRoleAdded(res.data.message);
        } else {
          console.error(
            "Unexpected status error during storing role: ",
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
          loadingStore: false,
        }));
      });
  };

  return (
    <form onSubmit={handleStoreRole}>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            className={`form-control ${state.errors.role ? "is-invalid" : ""}`}
            id="role"
            name="role"
            value={state.role}
            onChange={handleInputChange}
          />
          {state.errors.role && (
            <p className="text-danger">{state.errors.role[0]}</p>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success"
            disabled={state.loadingStore}
          >
            {state.loadingStore ? (
              <>
                <SpinnerSmall /> Loading...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRoleForm;
