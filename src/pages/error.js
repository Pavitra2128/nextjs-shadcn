import Link from 'next/link';
import styles from './404.module.css'; // Import your CSS module for styling

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a className={styles.link}>Back to Home</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
