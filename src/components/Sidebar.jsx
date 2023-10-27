import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function SideBar() {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     navigate("cities");
  //   }, []);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;Copyright {new Date().getFullYear()} by Worldwise
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
