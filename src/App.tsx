import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UsersProvider from "./context/Users";
import MyRouter from "./Router";

function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <MyRouter />
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
