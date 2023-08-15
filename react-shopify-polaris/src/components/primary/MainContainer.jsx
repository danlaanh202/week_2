import React from "react";
import styles from "./MainContainer.module.css";
import MainPage from "./MainPage";
import TodoTable from "../todo/TodoTable";
const MainContainer = () => {
  return (
    <div className="main-container">
      <div className={`${styles["main-container__content"]}`}>
        <MainPage />
        <TodoTable />
      </div>
    </div>
  );
};

export default MainContainer;
