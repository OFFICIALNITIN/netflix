import "./app.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";

function App() {
  const user = true
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home/> : <Navigate to="/register"/>}/>
          <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
          { user && (
            <>
          <Route path="/movies" element={<Home type="movies"/>}/>
          <Route path="/series" element={<Home type="Series"/>}/>
          <Route path="/watch" element={<Watch/>}/>
          <Route path="/" element={<Home/>}/>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
