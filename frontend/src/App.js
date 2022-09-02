import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/*" element={token !== undefined ? <Main /> : <Home />} />
    </Routes>
  );
}

export default App;
