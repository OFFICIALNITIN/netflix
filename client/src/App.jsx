import "./app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            index
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {user && (
            <>
              <Route path="/movies" element={<Home type="movie" />} />
              <Route path="/Series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
