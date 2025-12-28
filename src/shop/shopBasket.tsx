import { useOutletContext } from 'react-router-dom';
import { OutletProps } from './shop';
import styles from './shop.module.css';

export default function ShopBasket() {
  const { newAntiochTeam, basket, setBasket }: OutletProps = useOutletContext();

  const updateBasket = (newValue: string, key: string, type: number) => {
    const newBasket = { ...basket };
    let newQuantity = '';
    if (type === 0) {
      newQuantity = newValue;
    } else {
      let quantity = type;
      if (basket[key]) {
        quantity += parseInt(basket[key]);
      }
      if (quantity <= 0) {
        quantity = 0;
      } else if (quantity > 1000) {
        quantity = 1000;
      }
      newQuantity = quantity.toString();
    }
    newBasket[key] = newQuantity;
    setBasket(newBasket);
  };

  const deleteFromBasket = (key: string) => {
    const newBasket = { ...basket };
    delete newBasket[key];
    setBasket(newBasket);
  };

  const grandTotal = Object.keys(basket)
    .map((b) => {
      const item = newAntiochTeam.filter((i) => i.name === b)[0];
      let amount = 0;
      if (parseInt(basket[b])) {
        amount = item.price * parseInt(basket[b]);
      }
      return amount;
    })
    .reduce((partialSum, amt) => partialSum + amt, 0);

  return (
    <div className={styles.basketContainer}>
      <div className={styles.basketContainerTop}>
        <picture>
          <source
            srcSet="/Link477-React/TrenchCrusade.webp"
            type="image/webp"
          />
          <source srcSet="/Link477-React/TrenchCrusade.jpg" type="image/jpg" />
          <img
            src="/Link477-React/TrenchCrusade.jpg"
            alt="Trench Crusade New Antioch Warband."
            height={140}
            width="99%"
          />
        </picture>
      </div>
      <h2>Basket</h2>
      <p>Select your new war band.</p>
      {Object.keys(basket).map((b) => {
        const item = newAntiochTeam.filter((i) => i.name === b)[0];
        return (
          <div key={b}>
            <div className={styles.basketItem}>
              <picture>
                <source
                  srcSet={`/Link477-React/${item.path}.webp`}
                  type="image/webp"
                />
                <source
                  srcSet={`/Link477-React/${item.path}.jpg`}
                  type="image/jpg"
                />
                <img
                  height={64}
                  width={64}
                  src={`/Link477-React/${item.path}.jpg`}
                  alt={b}
                  className={styles.previewPic}
                />
              </picture>
              <div>
                <h3>{b}</h3>
                <p>
                  <output htmlFor="quantity">
                    {item.price *
                      (parseInt(basket[b]) ? parseInt(basket[b]) : 0)}
                  </output>{' '}
                  Ducats
                </p>
              </div>
              <details>
                <summary>Change</summary>
                <label>
                  Quantity:
                  <input
                    name="quantity"
                    placeholder="Quantity"
                    value={basket[b]}
                    className="form-control"
                    min={0}
                    max={1000}
                    onChange={(e) => updateBasket(e.target.value, b, 0)}
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateBasket('', b, 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateBasket('', b, -1)}
                >
                  -
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteFromBasket(b)}
                >
                  🗑️
                </button>
              </details>
            </div>
          </div>
        );
      })}
      <p>
        <b>Grand Total:</b> {grandTotal} Ducats
      </p>
      <button type="button" className={`btn ${styles.btnPurple}`}>
        Proceed to Payment
      </button>
      <br />
      <button type="button" className={`btn ${styles.btnPlain}`}>
        Cancel Order
      </button>
    </div>
  );
}
