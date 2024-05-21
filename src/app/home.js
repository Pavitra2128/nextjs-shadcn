import Link from 'next/link';
import { useState } from 'react';
import styles from "./index.module.css";

const HeroSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBranchesDropdown, setShowBranchesDropdown] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleBranchesMouseEnter = () => {
    setShowBranchesDropdown(true);
  };

  const handleBranchesMouseLeave = () => {
    setShowBranchesDropdown(false);
  };

  const handleBranchClick = (branchName) => {
    setSelectedBranch(branchName);
    setShowBranchesDropdown(false);
  };

  return (
    <div className={styles.heroSection}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="https://d2lk14jtvqry1q.cloudfront.net/media/large_243_79d258292c_b9de0c1ce3.png" alt="SVECW Logo" />
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/about">
              <div className={styles.navLink}>About Us</div>
            </Link>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.navLink}>Departments</div>
            {showDropdown && (
              <ul className={styles.dropdown}>
                <li>
                  <Link href="/departments/cse">
                    <div className={styles.dropdownItem}>Computer Science & Engineering (CSE)</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/aiml">
                    <div className={styles.dropdownItem}>Artificial Intelligence & Machine Learning (AIML)</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/arts">
                    <div className={styles.dropdownItem}>Arts</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/mechanical">
                    <div className={styles.dropdownItem}>Mechanical Engineering</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/civil">
                    <div className={styles.dropdownItem}>Civil Engineering</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={handleBranchesMouseEnter}
            onMouseLeave={handleBranchesMouseLeave}
          >
            <div className={styles.navLink}>Branches</div>
            {showBranchesDropdown && (
              <ul className={styles.dropdown}>
                <li onClick={() => handleBranchClick('Bhimavaram')}>
                  <div className={styles.dropdownItem}>Bhimavaram</div>
                </li>
                <li onClick={() => handleBranchClick('Hyderabad')}>
                  <div className={styles.dropdownItem}>Hyderabad</div>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/login">
              <div className={styles.navLink}>Login</div>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <div className={styles.navLink}>Signup</div>
            </Link>
          </li>
          <li>
            <Link href="/StudentsPage">
              <div className={styles.navLink}>Students</div>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <div className={styles.navLink}>Contact Us</div>
            </Link>
          </li>
        </ul>
      </nav>
      <section className={styles.searchSection}>
        <div className={styles.motivationalQuote}>
          <h2 className={styles.quote}>“Empowering Women Through Engineering Excellence”</h2>
        </div>
      </section>
      {selectedBranch && (
        <div className={`${styles.selectedBranch} ${selectedBranch === 'Hyderabad' ? styles.blueBackground : styles.greenBackground}`}>
          {selectedBranch}
        </div>
      )}
    </div>
  );
};

export default HeroSection;