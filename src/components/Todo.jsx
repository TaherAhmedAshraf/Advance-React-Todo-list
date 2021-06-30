import React, { useEffect, useState } from "react";
import "../App.css";

export default function Todo() {
  const getItems = () => {
    const list = localStorage.getItem("Lists");
    if (list) {
      console.log(list);
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState();
  const [items, addItems] = useState(getItems());

  const addItem = () => {
    if (inputData) {
      addItems([...items, inputData]);
      setInputData("");
    }
  };
  const deleteItem = (index) => {
    const updatedItem = items.filter((ele, ind) => {
      return ind !== index;
    });
    addItems(updatedItem);
  };
  const removeAll = () => {
    addItems([]);
  };
  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <h1
              style={{
                fontSize: 30,
                color: "orange",
                fontWeight: 600,
              }}
            >
              ToDoList
            </h1>
            <figcaption style={{ fontSize: 16 }}>
              1# ToDoList App in the world
            </figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <i
              className="fa fa-plus add-btn"
              title="Add Item "
              onClick={addItem}
            ></i>
          </div>

          <div className="showItems">
            {items.map((element, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{element}</h3>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(index)}
                  ></i>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => removeAll()}
            >
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
