import { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import AddRoleForm from "../../components/forms/role/AddRoleForm";
import RolesTable from "../../components/tables/role/RolesTable";
import MainLayout from "../layout/MainLayout";

const Roles = () => {
  const [refreshRoles, setRefreshRoles] = useState(false);

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

  const content = (
    <>
      <AlertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlertMessage}
      />
      <div className="row">
        <div className="col-md-3">
          <AddRoleForm
            onRoleAdded={(message) => {
              handleShowAlertMessage(message, true, true);
              setRefreshRoles(!refreshRoles);
            }}
          />
        </div>
        <div className="col-md-9">
          <RolesTable refreshRoles={refreshRoles} />
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Roles;
