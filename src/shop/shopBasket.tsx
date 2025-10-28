import { useOutletContext } from 'react-router-dom';
import { OutletProps } from './shop';

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
            <p>
              Amount:{' '}
              <output htmlFor="quantity">
                {item.price * (parseInt(basket[b]) ? parseInt(basket[b]) : 0)}
              </output>{' '}
              Ducats
            </p>
          </div>
        );
      })}
    </div>
  );
}
