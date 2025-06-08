import { useRef, useState } from "react";
import { Suppliers } from "../../../interfaces/Suppliers";
import EditSupplierForm from "../../forms/supplier/EditSupplierForm";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";

interface EditSupplierModalProps {
  showModal: boolean;
  supplier: Suppliers | null;
  onRefreshSuppliers: (refresh: boolean) => void;
  onClose: () => void;
}

const EditSupplierModal = ({
  showModal,
  supplier,
  onRefreshSuppliers,
  onClose,
}: EditSupplierModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshSuppliers, setRefreshSuppliers] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {
    setMessage("");
    setIsSuccess(false);
    setIsVisible(false);
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Supplier</h1>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <AlertMessage
                  message={message}
                  isSuccess={isSuccess}
                  isVisible={isVisible}
                  onClose={handleCloseAlertMessage}
                />
              </div>
              <EditSupplierForm
                supplier={supplier}
                setSubmitForm={submitFormRef}
                setLoadingUpdate={setLoadingUpdate}
                onSupplierUpdated={(message) => {
                  handleShowAlertMessage(message, true, true);
                  setRefreshSuppliers(!refreshSuppliers);
                  onRefreshSuppliers(refreshSuppliers);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={loadingUpdate}
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingUpdate}
                onClick={() => submitFormRef.current?.()}
              >
                {loadingUpdate ? (
                  <>
                    <SpinnerSmall /> Updating Supplier...
                  </>
                ) : (
                  "Save Supplier"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSupplierModal;
