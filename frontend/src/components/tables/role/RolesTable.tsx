import { useEffect, useState } from "react";
import RoleService from "../../../services/RoleService";
import EditRoleModal from "../../modals/role/EditRoleModal";
import DeleteRoleModal from "../../modals/role/DeleteRoleModal";
import AddRoleForm from "../../forms/role/AddRoleForm";
import { Roles } from "../../../interfaces/Roles";

const RolesTable = () => {
  const [roles, setRoles] = useState<Roles[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load roles from backend
  const loadRoles = () => {
    setLoading(true);
    RoleService.loadRoles()
      .then((res) => {
        if (res.status === 200) {
          setRoles(res.data.roles);
        }
      })
      .catch((error) => {
        console.error("Error loading roles:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRoles();
  }, []);

  // Called after a new role is added successfully
  const handleRoleAdded = (message: string) => {
    alert(message); // Replace with your preferred notification system
    loadRoles(); // Refresh roles table
  };

  const openEditModal = (role: Roles) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const openDeleteModal = (role: Roles) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedRole(null);
  };

  return (
    <>
      {}
      <div className="mb-4">
        <AddRoleForm onRoleAdded={handleRoleAdded} />
      </div>

      {}
      <table className="table">
        <thead>
          <tr>
            <th>Role ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center">
                Loading roles...
              </td>
            </tr>
          ) : roles.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No roles found.
              </td>
            </tr>
          ) : (
            roles.map((role) => (
              <tr key={role.role_id}>
                <td>{role.role_id}</td>
                <td>{role.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => openDeleteModal(role)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Role Modal */}
      <EditRoleModal
        role={selectedRole}
        show={showEditModal}
        onClose={closeModals}
        onRoleUpdated={(message) => {
          alert(message);
          loadRoles();
          closeModals();
        }}
      />

      {/* Delete Role Modal */}
      <DeleteRoleModal
        role={selectedRole}
        show={showDeleteModal}
        onClose={closeModals}
        onDeletedRole={(message) => {
          alert(message);
          loadRoles();
          closeModals();
        }}
      />
    </>
  );
};

export default RolesTable;
