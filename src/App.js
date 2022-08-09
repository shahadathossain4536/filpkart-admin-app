import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useEffect } from "react";
import { getAllCategory, getInitialData, isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/products" element={<Products></Products>}></Route>
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders></Orders>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category></Category>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/page"
          element={
            <PrivateRoute>
              <NewPage></NewPage>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  );
}

export default App;
