import { useRef, useState } from "react";
import DeleteSupplierForm from "../../forms/supplier/DeleteSupplierForm";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";
import { Suppliers } from "../../../interfaces/Suppliers";

interface DeleteSupplierModalProps {
  showModal: boolean;
  supplier: Suppliers | null;
  onRefreshSuppliers: (refresh: boolean) => void;
  onClose: () => void;
}

const DeleteSupplierModal = ({
  showModal,
  supplier,
  onRefreshSuppliers,
  onClose,
}: DeleteSupplierModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshSuppliers, setRefreshSuppliers] = useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);

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
              <h1 className="modal-title fs-5">Delete Supplier</h1>
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
              <p className="fs-4">
                Are you sure do you want to delete this supplier?
              </p>
              <DeleteSupplierForm
                supplier={supplier}
                setSubmitForm={submitFormRef}
                setLoadingDestroy={setLoadingDestroy}
                onDeletedSupplier={(message) => {
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
                disabled={loadingDestroy}
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={loadingDestroy}
                onClick={() => submitFormRef.current?.()}
              >
                {loadingDestroy ? (
                  <>
                    <SpinnerSmall /> Deleting Supplier...
                  </>
                ) : (
                  "Delete Supplier"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteSupplierModal;
