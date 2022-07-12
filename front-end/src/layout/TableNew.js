import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

const TableNew = () => {
  const intialTableValues = {
    table_name: "",
    capacity: 1,
  };

  const [tableForm, setTableForm] = useState({ ...intialTableValues });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const newTable = {
      ...tableForm,
    };
    async function submitTable() {
      try {
        await createTable(newTable, abortController.signal);
        setTableForm({ ...intialTableValues });
        history.push("/dashboard");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    }

    submitTable();
    return () => {
      abortController.abort();
    };
  };

  const handleChange = ({ target }) => {
    const { type, value, name } = target;
    setTableForm({
      ...tableForm,
      ...(type === "number" && { [name]: Number(value) }),
      ...(type === "text" && { [name]: value }),
    });
  };

  const handleCancel = async (event) => {
    setTableForm({ ...intialTableValues });
    history.goBack();
  };

  return (
    <div>
      <ErrorAlert error={error} />

      <h3>Add a New Table</h3>

      <div>
        <form className="form-group" onSubmit={handleSubmit}>
          <label>Table Name:</label>
          <br />
          <input
            name="table_name"
            type="text"
            required
            onChange={handleChange}
            placeholder="Must be 2 Characters"
          />
          <br />
          <label>Table Capacity:</label>
          <br />
          <input
            name="capacity"
            type="number"
            required
            onChange={handleChange}
            placeholder={1}
          />
          <br />

          <div>
            <button className="btn btn-primary mt-1" type="submit">
              Submit
            </button>
            <button className="btn btn-danger mt-1" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TableNew;
