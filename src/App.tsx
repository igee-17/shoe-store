import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import { toprateslaes, popularsales } from "./data/data";
import Landing from "./pages/Landing";
import ControlledLogin from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/:itemId"
          element={
            <ProductDetail
              items={[...toprateslaes.items, ...popularsales.items]}
            />
          }
        />
        <Route
          path="/login"
          element={<ControlledLogin setIsAuth={setIsAuth} />}
        />
      </Routes>
    </>
  );
};

export default App;
