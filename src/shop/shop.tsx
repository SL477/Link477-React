import { Outlet, Link } from 'react-router-dom';
import styles from './shop.module.css';

export default function Shop() {
  return (
    <div>
      <h1 className="centertext">Shop</h1>
      <div className={styles.gridContainer}>
        <nav className={styles.storeNav}>
          <Link to="/shop">Home</Link>
          <Link to="/shop/store">Store</Link>
          <Link to="/shop/basket">Basket</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
