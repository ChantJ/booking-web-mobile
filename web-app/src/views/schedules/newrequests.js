import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppointmentsContext } from "../../contexts/appointments";

import "./style.css";
const NewRequests = (props) => {
  const { setAppointments } = useContext(AppointmentsContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    setRequests(props.newRequests);
  }, [props.newRequests]);

  const handleClick = (type, appointment) => {
    let data = {
      ...appointment,
      status: type,
    };
    axios
      .post("/sellers/approvereject", data)
      .then((response) => setAppointments(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <div key={index} className="requestsContainer">
            <div>
              <div>
                <span>Name:</span> <span>{request.name}</span>
              </div>
              <div>
                <span>Email:</span> <span>{request.email}</span>
              </div>
              <div>
                <span>Start Date:</span>{" "}
                <span>{new Date(request.startDate).toLocaleString()}</span>
              </div>
              <div>
                <span>End Date:</span>{" "}
                <span>{new Date(request.endDate).toLocaleString()}</span>
              </div>
            </div>
            <div>
              <div className="buttonsContainer">
                <button
                  onClick={() => handleClick("approved", request)}
                  className="buttons"
                  style={{ background: "green" }}
                >
                  Accept
                </button>
              </div>
              <div className="buttonsContainer">
                <button
                  onClick={() => handleClick("rejected", request)}
                  className="buttons"
                  style={{ background: "red" }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No new Reuquests</div>
      )}
      <hr />
    </div>
  );
};

export default NewRequests;
