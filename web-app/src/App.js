import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { SellerContext } from "./contexts/sellerContext";
import { AppointmentsContext } from "./contexts/appointments";
import Layout from "./views/main/layout";
import "./App.css";

function App() {
  const [seller, setSeller] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("/users/")
      .then((response) => setSeller(response.data))
      .catch((err) => {
        setSeller(null);
        setAppointments([])
      });
  }, []);

  return (
    <BrowserRouter>
      <SellerContext.Provider value={{ seller, setSeller }}>
        <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
          <Layout />
        </AppointmentsContext.Provider>
      </SellerContext.Provider>
    </BrowserRouter>
  );
}

export default App;
