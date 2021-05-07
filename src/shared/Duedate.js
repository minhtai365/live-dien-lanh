import React, { useState } from "react";
import { UncontrolledPopover } from "reactstrap";
import SimpleReactCalendar from "simple-react-calendar";
import "./Duedate.css";
export default function Duedate() {
  const [state, setstate] = useState("");
  const handelText = (e) => {
    setstate(e.target.value);
  };
  return (
    <UncontrolledPopover target="test" trigger="legacy" placement="bottom">
      <SimpleReactCalendar activeMonth={new Date()} />
      <div
        style={{
          marginTop: "8px",
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",
          padding: "8px 20px",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontWeight: "500", fontSize: "15px", marginRight: "15px" }}
        >
          Due at
        </span>
        <input
          type="text"
          placeholder="12:00 PM"
          className="input-focus"
          value={state}
          onChange={handelText}
        />
      </div>
      <div
        style={{
          marginTop: "2px",
          padding: "10px",
        }}
      >
        <button className="button-clear">Clear Due Date</button>
      </div>
    </UncontrolledPopover>
  );
}
