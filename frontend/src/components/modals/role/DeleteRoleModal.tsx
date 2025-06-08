import { useRef, useState } from "react";
import { Roles } from "../../../interfaces/Roles";
import DeleteRoleForm from "../../forms/role/DeleteRoleForm";

interface DeleteRoleModalProps {
  role: Roles | null;
  show: boolean;
  onClose: () => void;
  onDeletedRole: (message: string) => void;
}

const DeleteRoleModal = ({
  role,
  show,
  onClose,
  onDeletedRole,
}: DeleteRoleModalProps) => {
  const [loadingDestroy, setLoadingDestroy] = useState(false);
  const submitFormRef = useRef<(() => void) | null>(null);

  const handleSubmit = () => {
    submitFormRef.current?.();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex={-1}
      aria-labelledby="deleteRoleModalLabel"
      aria-hidden={!show}
      style={{ backgroundColor: show ? "rgba(0, 0, 0, 0.5)" : undefined }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteRoleModalLabel">
              Delete Role
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              disabled={loadingDestroy}
            />
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this role?</p>
            <DeleteRoleForm
              role={role}
              setSubmitForm={submitFormRef}
              setLoadingDestroy={setLoadingDestroy}
              onDeletedRole={(message) => {
                onDeletedRole(message);
                onClose();
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loadingDestroy}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSubmit}
              disabled={loadingDestroy}
            >
              {loadingDestroy ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;
