import React, { useEffect, useContext, useState } from "react";
import RouteContent from "./routecontent";
import TopNavigation from "./topnavigation";
import TopBar from "./topbar";
import axios from "axios";
import { AppointmentsContext } from "../../contexts/appointments";

const MainLayout = (props) => {
  const { appointments } = useContext(AppointmentsContext);
  const [newRequests, setNewRequests] = useState([]);
  const [repliedAppointments, setRepliedAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("/sellers/appointments")
      .then((response) => {
        let pendings = response.data.filter(
          (appointment) => appointment.status === "pending"
        );
        let replied = response.data.filter(
          (appointment) => appointment.status === "approved"||appointment.status === "busy"
        );
        // replied.forEach((item) => (
        //   (item.startDate = new Date(item.startDate))
        //     (item.endDate = new Date(item.endDate))
        // ));
        setNewRequests(pendings);
        setRepliedAppointments(replied);
      })
      .catch((err) => console.log(err));
  }, [appointments]);
  return (
    <div style={{ height: "100%" }}>
      <TopBar />
      <TopNavigation
        {...props}
        newrequestsCount={newRequests.length}
      />
      <RouteContent
        {...props}
        newRequests={newRequests}
        repliedAppointments={repliedAppointments}
      />
    </div>
  );
};
export default MainLayout;
