import { Outlet, Link } from 'react-router-dom';
import styles from './shop.module.css';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export class imgCard {
  id: number;
  name: string;
  path: string;
  price: number;
  quantity: string;
  constructor(id: number, name: string, path: string, price: number) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.price = price;
    this.quantity = '';
  }
}

export interface OutletProps {
  newAntiochTeam: imgCard[];
  setNewAntiochTeam: Dispatch<SetStateAction<imgCard[]>>;
  basket: { [key: string]: string };
  setBasket: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

export default function Shop() {
  const [newAntiochTeam, setNewAntiochTeam] = useState<imgCard[]>([]);
  const [basket, setBasket] = useState<{ [key: string]: string }>({});

  useEffect(
    () =>
      setNewAntiochTeam([
        new imgCard(0, 'Combat Engineer', 'EngineerGeorge', 80),
        new imgCard(1, 'Sniper Priest', 'BrotherJulius', 50),
        new imgCard(2, 'Lieutenant', 'LtCarstairs', 70),
        new imgCard(3, 'Trench Cleric', 'PreacherPeter', 60),
        new imgCard(4, 'Mechanised Heavy Infantry', 'TheReaper', 85),
        new imgCard(5, 'Shocktroopers', 'PrivateJones', 45),
        new imgCard(6, 'Yeoman', 'Lyle', 35),
      ]),
    []
  );
  const numItems = Object.keys(basket).length;
  const numItemsStr = numItems > 0 ? ' - ' + numItems : '';

  return (
    <div>
      <h1 className="centertext">Shop</h1>
      <div className={styles.gridContainer}>
        <nav className={styles.storeNav}>
          <Link to="/shop">🏠 Home</Link>
          <Link to="/shop/store">🏬 Store</Link>
          <Link to="/shop/basket">🛒 Basket {numItemsStr}</Link>
        </nav>
        <Outlet
          context={{ newAntiochTeam, setNewAntiochTeam, basket, setBasket }}
        />
      </div>
    </div>
  );
}
