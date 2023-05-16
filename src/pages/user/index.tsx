import {
  validConfirmPassword,
  validEmail,
  validName,
  validOldPassword,
  validPassword,
} from "../../utils/validation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { z, ZodError } from "zod";
import "./styles.css";
import { useUsers } from "../../context/Users";
import { Link } from "react-router-dom";

const User: FC = () => {
  const { id } = useParams();
  const usersContext = useUsers();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const validFields = async (
    validation: Function,
    validationArgs: Array<any>,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {
    try {
      await validation(...validationArgs);
      setError(null);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        console.error(err.message, err.stack);
      } else {
        console.error(err);
      }
    }
  };

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
    <main className="user-page">
      <header>
        <h1>User:</h1>
        <p>{id ?? "New"}</p>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            nameError,
            emailError,
            passwordError,
            confirmPasswordError
          );
          if (
            !!(nameError || emailError || passwordError || confirmPasswordError)
          )
            return;

          id
            ? usersContext?.updateUser(oldPassword, {
                id,
                name,
                email,
                password,
              })
            : usersContext?.createUser({
                name,
                email,
                password,
              });
        }}
      >
        <section>
          <label>Name</label>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => validFields(validName, [name], setNameError)}
          />
          {!!nameError && <small>{nameError}</small>}
        </section>
        <section>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validFields(validEmail, [email], setEmailError)}
          />
          {!!emailError && <small>{emailError}</small>}
        </section>
        {!!id && (
          <section>
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onBlur={() =>
                validFields(
                  validOldPassword,
                  [oldPassword],
                  setOldPasswordError
                )
              }
            />
            {!!passwordError && <small>{oldPasswordError}</small>}
          </section>
        )}
        <section>
          <label>{!!id ? "New " : ""}Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              validFields(validPassword, [password], setPasswordError)
            }
          />
          {!!passwordError && <small>{passwordError}</small>}
        </section>
        <section>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validFields(
                validConfirmPassword,
                [e.target.value, password],
                setConfirmPasswordError
              );
            }}
          />
          {!!confirmPasswordError && <small>{confirmPasswordError}</small>}
        </section>
        <footer>
          <Link to="/">
            <button className="secondary" type="button">
              Back
            </button>
          </Link>
          <button type="submit">Save</button>
        </footer>
      </form>
    </main>
  );
};
export default User;
