import { useState } from "react";
import "./VirtualizedList.css";

const VirtualizedList = ({ list, height, width, itemHeight }) => {
  // First thing is used to slice the array properly
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);

  // Handler for scrolling event
  const handleOnScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);

    setIndices([newStartIndex, newEndIndex]);
  };

  // Create visible list on the viewport
  const visibleList = list.slice(indices[0], indices[1] + 1);

  return (
    <div className="main-container">
      <h1>Virtualized List</h1>
      <div
        className="list-container"
        onScroll={(e) => handleOnScroll(e)}
        style={{ width, height, overflow: "auto" }}
      >
        <div style={{ height: height * itemHeight, position: "relative" }}>
          {!visibleList.length ? (
            <div>No items available!</div>
          ) : (
            visibleList.map((item, index) => (
              <div
                key={index}
                style={{ height: itemHeight, width: "100%", position: "absolute", top: (indices[0] + index) * itemHeight, }}
                className="item"
              >{`Item ${item}`}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
