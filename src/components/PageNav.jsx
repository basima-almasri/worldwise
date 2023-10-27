import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">product </NavLink>
        </li>
        <li>
          <NavLink to="/price">price </NavLink>
        </li>
        <li>
          <NavLink to="/LogIn" className={styles.ctaLink}>
            LogIn{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
