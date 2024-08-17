import { useState } from 'react';

export default function StudentGrades() {
  const [currentGrade, setCurrentGrade] = useState('');
  const [grades, setGrades] = useState<number[]>([]);
  const words = [
    'The',
    'quick',
    'brown',
    'fox',
    'jumps',
    'over',
    'the',
    'lazy',
    'dog',
  ];

  const currentGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGrade(e.target.value);
  };

  const gradeAdder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const arr = [...grades];
    if (currentGrade) {
      arr.push(parseFloat(currentGrade));
      setGrades(arr);
    }
  };

  return (
    <div>
      <p>
        My answers to the exercises in{' '}
        <a href="https://github.com/GauravWalia19/Free-Algorithms-Books/blob/master/Library/src/JAVASCRIPT/Data-Structures-%26-Algorithms-with-JavaScript.pdf">
          Algorithms &amp; Data Structures with JS
        </a>
      </p>
      <fieldset>
        <label>
          Add Grade:
          <input
            name="addGrade"
            type="number"
            className="form-control"
            value={currentGrade}
            onChange={currentGradeChange}
          />
        </label>
        <button type="button" className="btn btn-primary" onClick={gradeAdder}>
          Add Grade
        </button>
      </fieldset>
      <p>Grades:</p>
      <ul>
        {grades.map((grade, idx) => (
          <li key={idx}>{grade}</li>
        ))}
      </ul>
      <p>
        Average Grade:{' '}
        {grades.length !== 0
          ? grades.reduce((a, b) => a + b, 0) / grades.length
          : 0}
      </p>
      <p>
        <b>2. Words</b>
      </p>
      <p>{words.toString()}</p>
      <p>{words.reverse().toString()}</p>
    </div>
  );
}
