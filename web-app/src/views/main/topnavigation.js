import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopNavigation = (props) => {
  const [selectedTab, setSelectedTab] = useState();
  useEffect(() => {
    if (props.location.pathname.split("/")[1] === "schedules") {
      setSelectedTab(0);
    } else {
      setSelectedTab(1);
    }
  }, [props.location.pathname]);

  return (
    <nav className="navbar">
      <li className={selectedTab === 0 ? "navitems current" : "navitems"}>
        <Link
          to="/schedules"
          style={{ textDecoration: "none", color: "#1753bc" }}
        >
          Scheduales
        </Link>
      </li>

      <li className={selectedTab === 1 ? "navitems current" : "navitems"}>
        <Link
          to="/newrequests"
          style={{ textDecoration: "none", color: "#1753bc" }}
        >
          New Requests
          {props.newrequestsCount > 0 && (
            <span className="pending">{props.newrequestsCount}</span>
          )}
        </Link>
      </li>
    </nav>
  );
};
export default TopNavigation;
