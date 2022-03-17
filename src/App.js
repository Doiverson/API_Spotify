import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./Main";
import Login from "./Login";


function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/main" element={<Main/>} />
        </Routes>
    </Router>
  );
}

export default App;
