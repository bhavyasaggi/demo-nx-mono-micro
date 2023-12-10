import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface AuthFailureProps {}

export function AuthFailure(props: AuthFailureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedUi!</h1>
    </div>
  );
}

export default AuthFailure;
