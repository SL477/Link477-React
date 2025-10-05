import { useState } from 'react';
import Education, { eductionCls } from './education';
import Work, { workCls } from './work';

export default function CV() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [education, setEduction] = useState(new eductionCls());
  const [work, setWork] = useState(new workCls());
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
        <Education id={1} setEduction={setEduction} eduction={education} />
        <Work work={work} setWork={setWork} />
      </form>
    </main>
  );
}
