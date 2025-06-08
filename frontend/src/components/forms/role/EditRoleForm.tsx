import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Roles } from "../../../interfaces/Roles";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";

interface EditRoleFormProps {
  role: Roles | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onRoleUpdated: (message: string) => void;
}

const EditRoleForm = ({
  role,
  setSubmitForm,
  setLoadingUpdate,
  onRoleUpdated,
}: EditRoleFormProps) => {
  const [state, setState] = useState({
    role_id: 0,
    role: "",
    errors: {} as { role?: string[] },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateRole = (e: FormEvent) => {
    e.preventDefault();

    setLoadingUpdate(true);

    RoleService.updateRole(state.role_id, { role: state.role })
      .then((res) => {
        if (res.status === 200) {
          onRoleUpdated(res.data.message);
        } else {
          console.error("Unexpected status while updating role:", res.status);
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
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
    if (role) {
      setState({
        role_id: role.role_id,
        role: role.role,
        errors: {},
      });
    } else {
      setState({
        role_id: 0,
        role: "",
        errors: {},
      });
    }

    setSubmitForm.current = () => {
      formRef.current?.requestSubmit();
    };
  }, [role, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleUpdateRole}>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role Name
        </label>
        <input
          type="text"
          id="role"
          name="role"
          className={`form-control ${state.errors.role ? "is-invalid" : ""}`}
          value={state.role}
          onChange={handleInputChange}
        />
        {state.errors.role && (
          <div className="invalid-feedback">{state.errors.role[0]}</div>
        )}
      </div>
    </form>
  );
};

export default EditRoleForm;
