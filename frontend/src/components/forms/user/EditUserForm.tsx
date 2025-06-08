import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Roles } from "../../../interfaces/Roles";
import { UserFieldErrors } from "../../../interfaces/UserFielderrors";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Users } from "../../../interfaces/Users";
import UserService from "../../../services/UserService";

interface EditUserFormProps {
  user: Users | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onUserUpdated: (message: string) => void;
}

const EditUserForm = ({
  user,
  setSubmitForm,
  setLoadingUpdate,
  onUserUpdated,
}: EditUserFormProps) => {
  const [state, setState] = useState({
    loadingRoles: true,
    roles: [] as Roles[],
    user_id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    role: "",
    email: "",
    errors: {} as UserFieldErrors,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoadRoles = () => {
    RoleService.loadRoles()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            roles: res.data.roles,
          }));
        } else {
          console.error(
            "Unexpected status error while loading roles: ",
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
          loadingRoles: false,
        }));
      });
  };

  const handleUpdateUser = (e: FormEvent) => {
    e.preventDefault();

    setLoadingUpdate(true);

    UserService.updateUser(state.user_id, state)
      .then((res) => {
        if (res.status === 200) {
          onUserUpdated(res.data.message);
        } else {
          console.error(
            "Unexpected status error while updating user: ",
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
        setLoadingUpdate(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    handleLoadRoles();

    if (user) {
      setState((prevState) => ({
        ...prevState,
        user_id: user.user_id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        role: user.role.role_id.toString(),
        email: user.email,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        user_id: 0,
        first_name: "",
        middle_name: "",
        last_name: "",
        role: "",
        email: "",
        errors: {} as UserFieldErrors,
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [user, setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleUpdateUser}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.first_name ? "is-invalid" : ""
                }`}
                name="first_name"
                id="first_name"
                value={state.first_name}
                onChange={handleInputChange}
              />
              {state.errors.first_name && (
                <span className="text-danger">
                  {state.errors.first_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.middle_name ? "is-invalid" : ""
                }`}
                name="middle_name"
                id="middle_name"
                value={state.middle_name}
                onChange={handleInputChange}
              />
              {state.errors.middle_name && (
                <span className="text-danger">
                  {state.errors.middle_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.last_name ? "is-invalid" : ""
                }`}
                name="last_name"
                id="last_name"
                value={state.last_name}
                onChange={handleInputChange}
              />
              {state.errors.last_name && (
                <span className="text-danger">{state.errors.last_name[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="role">Role</label>
              <select
                className={`form-select ${
                  state.errors.role ? "is-invalid" : ""
                }`}
                name="role"
                id="role"
                value={state.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                {state.loadingRoles ? (
                  <option value="">Loading...</option>
                ) : (
                  state.roles.map((role, index) => (
                    <option value={role.role_id} key={index}>
                      {role.role}
                    </option>
                  ))
                )}
              </select>
              {state.errors.role && (
                <span className="text-danger">{state.errors.role[0]}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.email ? "is-invalid" : ""
                }`}
                name="email"
                id="email"
                value={state.email}
                onChange={handleInputChange}
              />
              {state.errors.email && (
                <span className="text-danger">{state.errors.email[0]}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUserForm;
