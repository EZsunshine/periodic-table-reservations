import React, { useEffect, useState } from "react";
import { previous, next, today } from "../utils/date-time";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableDetail from "./TableDetail";
import ReservationDetail from "./ReservationDetail";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [viewDate, setViewDate] = useState(date);
  const [tables, setTables] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const dateQueryCheck = async () => {
      const dateQuery = query.get("date");
      if (dateQuery) {
        setViewDate(dateQuery);
      } else {
        setViewDate(today());
      }
    };
    dateQueryCheck();
  }, [query, date]);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables().then(setTables).catch(setReservationsError);
    return () => abortController.abort();
  }, []);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // load the reservations by date
  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    if (viewDate === date) {
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    } else {
      listReservations({ viewDate }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  }, [date, viewDate]);

  // load all tables
  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables().then(setTables).catch(setReservationsError);
    return () => abortController.abort();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <div>
        {/* <button onClick={handlePreviousDay}>Previous Day</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNextDay}>Next Day</button> */}
        <button
          onClick={() => {
            history.push(`/dashboard?date=${previous(viewDate)}`);
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            history.push(`/dashboard?date=${today()}`);
          }}
        >
          Today
        </button>
        <button
          onClick={() => {
            history.push(`/dashboard?date=${next(viewDate)}`);
          }}
        >
          Next
        </button>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {viewDate}</h4>
      </div>

      <div>
        {reservations &&
          reservations.map((reservation) => (
            <div key={reservation.reservation_id}>
              <ReservationDetail reservation={reservation} />
            </div>
          ))}
      </div>

      <div>
        <h3>Tables</h3>
        <div className="row">
          {tables &&
            tables.map((table) => (
              <div className="col-md-6  col-lg-3 mb-3" key={table.table_id}>
                <TableDetail table={table} />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
