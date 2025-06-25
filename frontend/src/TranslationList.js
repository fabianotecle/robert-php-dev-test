import React from 'react';

const TranslationList = ({ onEdit, translations }) => {
  return (
    <div>
      <h3>Translations</h3>
      {translations.length === 0 && <p>No translations found.</p>}
      {translations.map((unit) => (
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