import { api } from "../configs/api";
import { IUser } from "@/entities/user";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IUsersContext {
  users: IUser[];
  createUser: (user: Required<Omit<IUser, "id">>) => Promise<IUser | null>;
  updateUser: (
    oldPassword: string,
    user: Required<IUser>
  ) => Promise<IUser | null>;
  deleteUser: (id: string) => Promise<void>;
}
const UsersContext = createContext<IUsersContext | undefined>(undefined);

const UsersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api()
      .get("users")
      .then(({ data }: { data: IUser[] }) => setUsers(data))
      .catch((err) => {
        setUsers([]);
        console.error(err.message, err.stack);
        toast(err.message, { type: "error" });
      });
  }, []);

  const createUser = async (user: Required<Omit<IUser, "id">>) => {
    try {
      const payload = {
        name: user.name,
        email: user.email,
        password: window.btoa(user.password),
      };
      const { data } = (await api().post("users", { data: payload })) as {
        data: IUser;
      };

      setUsers((prev) => [...prev, data]);
      toast("User created successful", { type: "success" });
      navigate("/");

      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, err.stack);
        toast(err.message, { type: "error" });
      } else {
        console.error(err);
        toast("Some error has occurred!", { type: "error" });
      }
    }
    return null;
  };
  const updateUser = async (oldPassword: string, user: Required<IUser>) => {
    try {
      const payload = {
        name: user.name,
        email: user.email,
        oldPassword: window.btoa(oldPassword),
        password: window.btoa(user.password),
      };
      const { data } = (await api().put(`users/${user.id}`, {
        data: payload,
      })) as { data: IUser };

      setUsers((prev) => prev.map((x) => (x.id === data.id ? data : x)));
      toast("User created successful", { type: "success" });
      navigate("/");

      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, err.stack);
        toast(err.message, { type: "error" });
      } else {
        console.error(err);
        toast("Some error has occurred!", { type: "error" });
      }
      return null;
    }
  };
  const deleteUser = async (id: string) => {
    try {
      await api().delete(`users/${id}`);

      setUsers((prev) => prev.filter((x) => x.id !== id));
      toast("User deleted successful", { type: "success" });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, err.stack);
        toast(err.message, { type: "error" });
      } else {
        console.error(err);
        toast("Some error has occurred!", { type: "error" });
      }
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, createUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
export default UsersProvider;

export const useUsers = () => {
  return useContext(UsersContext);
};
