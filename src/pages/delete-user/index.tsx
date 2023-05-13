import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { useUsers } from "../../context/Users";
import { Link } from "react-router-dom";

const DeleteUser: FC = () => {
  const { id } = useParams();
  const usersContext = useUsers();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const user = usersContext?.users.find((x) => x.id === id);
      if (!user) setUserNotFound(true);
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
    }
  }, [id]);

  if (userNotFound)
    return (
      <main>
        <h1>User not found!</h1>
        <Link to="/">Back</Link>
      </main>
    );
  return (
    <main className="delete-user-page">
      <header>
        <h1>Delete User</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          id && usersContext?.deleteUser(id);
        }}
      >
        <h3>Are you sure to delete the following user?</h3>
        <p>
          {name}: {email}
        </p>
        <footer>
          <Link to="/">
            <button className="secondary" type="button">
              Back
            </button>
          </Link>
          <button type="submit">Delete</button>
        </footer>
      </form>
    </main>
  );
};
export default DeleteUser;
