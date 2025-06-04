import { useEffect, useState } from "react";
import { Genders } from "../../../interfaces/Genders";
import GenderService from "../../../services/GenderService";
import Spinner from "../../Spinner";
import { Link } from "react-router-dom";

interface GendersTableProps {
  refreshGenders: boolean;
}

const GendersTable = ({ refreshGenders }: GendersTableProps) => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
  });

  const handleLoadGenders = async () => {
    try {
      const res = await GenderService.loadGenders();

      if (res.status === 200) {
        setState((prevState) => ({
          ...prevState,
          genders: res.data.genders,
        }));
      } else {
        console.error(
          "Unexpected status error occured during load genders: ",
          res.status
        );
      }
    } catch (error: any) {
      console.error(
        "Unexpected server error occured during load genders: ",
        error
      );
    } finally {
      setState((prevState) => ({
        ...prevState,
        loadingGenders: false,
      }));
    }
  };

  useEffect(() => {
    handleLoadGenders();
  }, [refreshGenders]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="align-middle">
            <th>No.</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingGenders ? (
            <tr className="align-middle">
              <td colSpan={3} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : state.genders.length > 0 ? (
            state.genders.map((gender, index) => (
              <tr className="align-middle" key={index}>
                <td>{index + 1}</td>
                <td>{gender.gender}</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/gender/edit/${gender.gender_id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/gender/delete/${gender.gender_id}`}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td className="text-center" colSpan={3}>
                No Genders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GendersTable;
