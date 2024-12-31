import React from "react";

function itemList() {
  const items = ["apple", "banana", "broccoli"];

  return (
    <>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default itemList;
