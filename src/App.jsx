import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layaout from "./components/Layaout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Quiz from "./components/pages/Quiz";
import Result from "./components/pages/Result";
import Signup from "./components/pages/Signup";
import "./components/styles/app.css";
import AuthProvider from "./context/authContext";
import Toastcontainer from "./components/toastcontainer";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layaout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/result/:id"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toastcontainer />
        </Layaout>
      </AuthProvider>
    </BrowserRouter>
  );
}
