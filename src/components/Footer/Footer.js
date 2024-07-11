import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <p>
        This game has been programmed for practice purposes only and may not yet
        be complete or error-free.
      </p>
    </footer>
  );
}

export default Footer;
