import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

const TableNew = () => {
  const history = useHistory();
  const [table_name, setTable_name] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      setError(null);
      const table = {
          table_name,
          capacity,
      };
      createTable(table)
          .then(() => {
              history.push("/dashboard");
          })
          .catch(setError);
  }

  const handleCancel = (e) => {
      e.preventDefault();
      history.goBack();
  }
  
  return (
    <div>
      <ErrorAlert error={error} />

      <h3>Add a New Table</h3>

      <div>
          <form className="form-group" onSubmit={handleSubmit}>
              <label >Table Name:</label>
              <br />
              <input
                  name="table_name"
                  type="text"
                  required
                  onChange={(e) => setTable_name(e.target.value)}
                  value={table_name}
              />
              <br />
              <label >Table Capacity:</label>
              <br />
              <input
                  name="capacity"
                  type="number"
                  required
                  onChange={(e) => setCapacity(e.target.valueAsNumber)}
                  value={capacity}
              />
              <br />

              <div>
                  <button className="btn btn-primary mt-1" type="submit">Submit</button>
                  <button className="btn btn-danger mt-1" onClick={handleCancel}>Cancel</button>
              </div>
          </form>
      </div>
      </div>
  )}
export default TableNew;