import React, { useEffect, useState } from "react";
import "../App.css";

export default function Updated() {
  const getItems = () => {
    const list = localStorage.getItem("Lists");
    if (list) {
      console.log(list);
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [items, addItems] = useState(getItems());
  const [touggleBtn, settouggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !touggleBtn) {
      addItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      settouggleBtn(true);

      setInputData("");

      setIsEditItem(null);
    } else if (inputData) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      addItems([...items, allInputData]);

      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((ele) => {
      return ele.id !== id;
    });
    addItems(updatedItem);
  };

  const removeAll = () => {
    addItems([]);
  };

  const editItem = (id) => {
    let newEditItem = items.find((ele) => {
      return ele.id === id;
    });
    console.log(newEditItem);
    settouggleBtn(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
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
              UpdatedList
            </h1>
            <figcaption style={{ fontSize: 16 }}>
              1# UpdatedList App in the world
            </figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {touggleBtn ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item "
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Add Item "
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(element.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
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
