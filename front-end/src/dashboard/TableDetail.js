import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteReservationId, updateReservationStatus } from "../utils/api";

function TableDetail({ table }) {
  const history = useHistory();
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState("Table is Free");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentTable.reservation_id) {
      setTableStatus(
        `Occupied by Reservation ID: ${currentTable.reservation_id}`
      );
    } else {
      setTableStatus("Table is Free");
    }
  }, [currentTable]);

  const handleFinish = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: "finished" },
        currentTable.reservation_id
      ).catch(setError);
      deleteReservationId(currentTable.table_id)
        .then((response) => {
          setCurrentTable(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

  return (
    <div>
      <div className="card">
        <ErrorAlert error={error} />
        <div className="card-body">
          <p className="card-text">Table: {currentTable.table_name}</p>
          <p className="card-text">Table Capacity: {currentTable.capacity}</p>
          <p
            className={
              currentTable.reservation_id
                ? "card-text text-danger"
                : "card-text text-success"
            }
            data-table-id-status={currentTable.table_id}
          >
            {currentTable.reservation_id ? "Occupied" : "Free"}
          </p>

          {tableStatus === "Table is Free" ? (
            <div></div>
          ) : (
            <div>
              <button
                className="btn btn-primary"
                data-table-id-finish={currentTable.table_id}
                onClick={handleFinish}
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableDetail;
