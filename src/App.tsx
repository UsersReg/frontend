import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UsersProvider from "./context/Users";
import MyRouter from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <UsersProvider>
          <MyRouter />
        </UsersProvider>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
