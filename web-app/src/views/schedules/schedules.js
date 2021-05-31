import React, { useContext } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  Toolbar,
  DateNavigator,
  Appointments,
  WeekView,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";
import { SellerContext } from "../../contexts/sellerContext";
import { AppointmentsContext } from "../../contexts/appointments";

const Schedules = (props) => {
  const { seller } = useContext(SellerContext);
  const { setAppointments } = useContext(AppointmentsContext);
  const changeAvailability = (appointmentData, isAvailable) => {
    let Data = {
      name: seller.name,
      startDate: appointmentData.startDate,
      endDate: appointmentData.endDate,
      status: "busy",
      email: seller.email,
      sellerEmail: seller.email,
    };
    axios
      .post("/sellers/changeavailablity", {
        isAvailable: isAvailable,
        data: Data,
        id: appointmentData._id,
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
  };

  const CustomAppointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor:
            children[1].props.data.status === "busy" ? "red" : "blue",
        }}
        className="appointment"
      >
        {children[1].props.data.status === "busy"
          ? "Busy"
          : children[1].props.data.name}
      </Appointments.Appointment>
    );
  };
  const CustomLayout = ({ appointmentData }) => {
    return !appointmentData.status ? (
      <div className="popupcontainer">
        <div>
          <div>Make this slot unavailable</div>
          <button
            style={{ width: "100%" }}
            onClick={() => changeAvailability(appointmentData, false)}
          >
            save
          </button>
        </div>
      </div>
    ) : appointmentData.status === "busy" ? (
      <div className="popupcontainer">
        <div>
          <div>Make this slot available again</div>
          <button
            style={{ width: "100%" }}
            onClick={() => changeAvailability(appointmentData, true)}
          >
            save
          </button>
        </div>
      </div>
    ) : (
      <div className="popupcontainer">
        <div>
          <span>name:</span>
          <span>{appointmentData.name}</span>
        </div>
        <div>
          <span>startDate:</span>
          <span>{appointmentData.startDate}</span>
        </div>
        <div>
          <span>endDate:</span>
          <span>{appointmentData.endDate}</span>
        </div>
      </div>
    );
  };

  return (
    <Paper style={{ height: "90%", margin: "2rem" }}>
      <Scheduler data={props.repliedAppointments}>
        <ViewState defaultCurrentDate={new Date()} />
        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        {/* <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing /> */}
        <Appointments appointmentComponent={CustomAppointment} />
        <AppointmentForm
          basicLayoutComponent={CustomLayout}
          commandLayoutComponent={() => null}
        />
      </Scheduler>
    </Paper>
  );
};

export default Schedules;
