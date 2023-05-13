import { FC } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../context/Users";
import "./styles.css";
const Home: FC = () => {
  const usersContext = useUsers();
  return (
    <main className="home-page">
      <header>
        <h1>Welcome to UsersReg!</h1>
        <p>Users list:</p>
      </header>
      <div className="users-container">
        <table className="users">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersContext?.users.map((user) => (
              <tr key={user.id} className="user">
                <td>...{user.id.slice(-6)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link title="Edit user" to={`/user/${user.id}`}>
                    ✏️
                  </Link>
                  <Link title="Delete user" to={`/delete/${user.id}`}>
                    🗑️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link className="add-user-button" to="/user">
        Add user
      </Link>
    </main>
  );
};
export default Home;
