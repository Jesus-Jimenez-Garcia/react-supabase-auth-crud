import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskContext";

import { supabase } from "./supabase/client";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((session) => {
      !session ? navigate("/login") : navigate("/");
    });
  }, []);

  return (
    <div className="App">
      <TaskContextProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TaskContextProvider>
    </div>
  );
}

export default App;
