import { FC } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const AddButton: FC = () => {
  return (
    <Link className="add-button" to={"/user"}>
      Add new user
    </Link>
  );
};

export default AddButton;
