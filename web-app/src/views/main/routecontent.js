import React from "react";
import { Switch, Route } from "react-router-dom";
import Schedules from "../schedules/schedules";
import NewRequests from "../schedules/newrequests"
import "./style.css";

const RouteContent = (props) => {
  return (
    <Switch>
      <Route exact path="/schedules" component={()=><Schedules {...props}/>} />
      <Route exact path="/newrequests" component={()=><NewRequests {...props}/>}  />
    </Switch>
  );
};
export default RouteContent;
