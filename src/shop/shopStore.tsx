import { useOutletContext } from 'react-router-dom';
import { OutletProps, imgCard } from './shop';
import styles from './shop.module.css';

export default function ShopStore() {
  const { newAntiochTeam, setNewAntiochTeam, basket, setBasket }: OutletProps =
    useOutletContext();

  const setNewQuantity = (newValue: string, idx: number, type: number) => {
    const tmpTeam = [...newAntiochTeam];
    if (type === 0) {
      tmpTeam[idx].quantity = newValue;
    } else {
      let newVal = type;
      if (tmpTeam[idx].quantity) {
        newVal += parseInt(tmpTeam[idx].quantity);
      }
      if (newVal <= 0) {
        tmpTeam[idx].quantity = '';
      } else if (newVal > 1000) {
        tmpTeam[idx].quantity = '1000';
      } else {
        tmpTeam[idx].quantity = newVal.toString();
      }
    }
    setNewAntiochTeam(tmpTeam);
  };

  const addToBasket = (item: imgCard) => {
    const newBasket = { ...basket };
    let quantity = 1;
    if (newAntiochTeam[item.id].quantity) {
      quantity = parseInt(newAntiochTeam[item.id].quantity);
    }
    if (newBasket[item.name]) {
      quantity += parseInt(newBasket[item.name]);
      newBasket[item.name] = quantity.toString();
    } else {
      newBasket[item.name] = quantity.toString();
    }
    setBasket(newBasket);
    setNewQuantity('', item.id, 0);
  };

  return (
    <div className={styles.pictureGrid}>
      {newAntiochTeam.map((i) => (
        <div key={i.id} className={styles.pictureHolder}>
          <img src={`/Link477-React/${i.path}`} alt={i.name} />
          <p>{i.name}</p>
          <div>
            <button
              type="button"
              onClick={() => setNewQuantity('1', i.id, 1)}
              className="btn btn-primary"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setNewQuantity('1', i.id, -1)}
              className="btn btn-primary"
            >
              -
            </button>
            <br />
            <label>
              Quantity
              <input
                className="form-control"
                type="number"
                placeholder="Quantity"
                min={0}
                max={1000}
                value={i.quantity}
                onChange={(e) => setNewQuantity(e.target.value, i.id, 0)}
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addToBasket(i)}
            >
              Add to basket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
