import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import ShipmentCreate from "./pages/shipment_create";
import ShipmentIndex from "./pages/shipment_index";
import { commontRoutes } from "./routes";
// import routes from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App relative">
      <div className="fixed h-screen w-screen -z-10 bg-gray-900"></div>
      <BrowserRouter>
        <Routes>
          {commontRoutes.map((item) => (
            <Route
              key={item.key}
              path={item.path}
              element={
                <React.Suspense
                  fallback={
                    <>
                      <div>...</div>
                    </>
                  }
                >
                  {<item.element />}
                </React.Suspense>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
