import {Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";

function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<h1>Team Flow</h1>}/>
        <Route path="/login" element={<h1>Login</h1>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
};

export default App;

