import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
