import React, { useEffect, useState } from 'react';

const TranslationList = ({ onEdit }) => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchSomeUnits = async () => {
      let temp = [];
      for (let i = 1; i <= 3; i++) {
        const res = await fetch(`http://localhost/robert-php-dev-test/api/translations.php?id=${i}`);
        if (res.ok) {
          const json = await res.json();
          temp.push(json);
        }
      }
      setUnits(temp);
    };
    fetchSomeUnits();
  }, []);

  return (
    <div>
      <h3>Translations</h3>
      {units.map((unit) => (
        <div key={unit.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
          <p><strong>{unit.language_from} ➜ {unit.language_to}</strong></p>
          <p>Source: {unit.source_text}</p>
          <p>Translation: {unit.translated_text}</p>
          <button onClick={() => onEdit(unit)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TranslationList;