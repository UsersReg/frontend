import { Routes, Route } from "react-router-dom";
import DeleteUser from "./pages/delete-user";
import Home from "./pages/home";
import User from "./pages/user";

function MyRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/user/:id?"} element={<User />} />
      <Route path={"/delete/:id?"} element={<DeleteUser />} />
    </Routes>
  );
}

export default MyRouter;
