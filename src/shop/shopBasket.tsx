import { useOutletContext } from 'react-router-dom';
import { OutletProps, imgCard } from './shop';
import styles from './shop.module.css';

export default function ShopBasket() {
  const { newAntiochTeam, basket, setBasket }: OutletProps = useOutletContext();
  return (
    <div>
      <h2>Basket</h2>
      {Object.keys(basket).map((b) => {
        const item = newAntiochTeam.filter((i) => i.name === b)[0];
        return (
          <div key={b}>
            <h3>{b}</h3>
            <img
              height={200}
              width={125}
              src={`/Link477-React/${item.path}`}
              alt={b}
            />
            <br />
            <label>
              Quantity:{' '}
              <input
                name="quantity"
                value={basket[b]}
                className="form-control"
              />
            </label>
            <button type="button" className="btn btn-primary">
              +
            </button>
            <button type="button" className="btn btn-primary">
              -
            </button>
            <button type="button" className="btn btn-danger">
              🗑️
            </button>
            <p>
              Amount:{' '}
              <output htmlFor="quantity">{item.price * basket[b]}</output>{' '}
              Ducats
            </p>
          </div>
        );
      })}
    </div>
  );
}
