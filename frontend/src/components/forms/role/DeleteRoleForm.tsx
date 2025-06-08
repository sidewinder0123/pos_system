import { FormEvent, useEffect, useRef, useState } from "react";
import RoleService from "../../../services/RoleService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Roles } from "../../../interfaces/Roles";

interface DeleteRoleFormProps {
  role: Roles | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeletedRole: (message: string) => void;
}

const DeleteRoleForm = ({
  role,
  setSubmitForm,
  setLoadingDestroy,
  onDeletedRole,
}: DeleteRoleFormProps) => {
  const [state, setState] = useState({
    role_id: 0,
    role: "",
  });

  const handleDestroyRole = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    RoleService.destroyRole(state.role_id)
      .then((res) => {
        if (res.status === 200) {
          onDeletedRole(res.data.message);
        } else {
          console.error("Unexpected status while deleting role:", res.status);
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingDestroy(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (role) {
      setState({
        role_id: role.role_id,
        role: role.role,
      });
    } else {
      setState({
        role_id: 0,
        role: "",
      });
    }

    setSubmitForm.current = () => {
      formRef.current?.requestSubmit();
    };
  }, [role, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleDestroyRole}>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role Name
        </label>
        <input
          type="text"
          id="role"
          name="role"
          className="form-control"
          value={state.role}
          readOnly
        />
      </div>
    </form>
  );
};

export default DeleteRoleForm;
