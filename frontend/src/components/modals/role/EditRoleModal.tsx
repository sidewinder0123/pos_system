import { useRef, useState } from "react";
import { Roles } from "../../../interfaces/Roles";
import EditRoleForm from "../../forms/role/EditRoleForm";

interface EditRoleModalProps {
  role: Roles | null;
  show: boolean;
  onClose: () => void;
  onRoleUpdated: (message: string) => void;
}

const EditRoleModal = ({
  role,
  show,
  onClose,
  onRoleUpdated,
}: EditRoleModalProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const submitFormRef = useRef<(() => void) | null>(null);

  const handleSubmit = () => {
    submitFormRef.current?.();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex={-1}
      aria-labelledby="editRoleModalLabel"
      aria-hidden={!show}
      style={{ backgroundColor: show ? "rgba(0, 0, 0, 0.5)" : undefined }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editRoleModalLabel">
              Edit Role
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <EditRoleForm
              role={role}
              setSubmitForm={submitFormRef}
              setLoadingUpdate={setLoadingUpdate}
              onRoleUpdated={(message) => {
                onRoleUpdated(message);
                onClose();
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loadingUpdate}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;
