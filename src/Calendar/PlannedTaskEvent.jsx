/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { EVENT_STATUS_COLORS } from "./Calendar.constants";
import { useState } from "react";

export default function PlannedTaskEvent({ task, onDoubleClick }) {
  const { title } = task;
  const background = EVENT_STATUS_COLORS[status];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "#D3F7D7",
          padding: "10px",
          height: "100%",
          color: "black",
          borderRadius: "4px",
          borderTop: "8px solid #6CB975",
        }}
        // onDoubleClick={() => onDoubleClick(appointment)}
        // onContextMenu={(e) => {
        //   e.stopPropagation();
        //   e.preventDefault();
        //   setIsOpen(true);
        // }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {/* Represent for title */}
            <p style={{ fontSize: "12px", margin: 0 }}>{title}</p>
          </div>
        </div>
      </div>
      {/* {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: "0" }}>
          <div style={{ fontWeight: "bold" }}>Options</div>
          <div>lol</div>
        </div>
      )} */}
    </>
  );
}
