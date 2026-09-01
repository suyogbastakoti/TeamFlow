import {Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

function App(){

  return(
    <>
      <Routes>
        <Route path="/"  element={<> HomeScreen </>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projects/:id" element={<ProjectDetails/>}/>
      </Routes>
    </>
  );
};

export default App;

