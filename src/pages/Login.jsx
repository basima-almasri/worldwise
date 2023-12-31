import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FackAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [isClicked, setIsClicked] = useState(false);
  const { logIn, authentication } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (authentication) navigate("/app", { replace: true });
  // }, [authentication]);
  useEffect(() => {
    if (authentication && isClicked) navigate("/app");
  }, [authentication, isClicked, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    logIn(email, password);
    setIsClicked(true);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary"> Login</Button>
        </div>
      </form>
    </main>
  );
}
