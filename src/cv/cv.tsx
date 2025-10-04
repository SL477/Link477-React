import { useState } from 'react';

export default function CV() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  return (
    <main>
      <h1 className="centertext">CV</h1>
      <form>
        <h2>General Information</h2>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <h2>Education</h2>
      </form>
    </main>
  );
}
