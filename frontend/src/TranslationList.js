import React, { useEffect, useState } from 'react';

const TranslationList = ({ onEdit }) => {
  const [units, setUnits] = useState([]);
  const [history, setHistory] = useState({});
  const [openHistoryId, setOpenHistoryId] = useState(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await fetch('http://localhost/robert-php-dev-test/api/translations.php');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setUnits(data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
      }
    };
    fetchUnits();
  }, []);

  const toggleHistory = async (id) => {
    if (openHistoryId === id) {
      setOpenHistoryId(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost/robert-php-dev-test/api/translations.php?id=${id}&history=1`);
      const data = await res.json();
      setHistory((prev) => ({ ...prev, [id]: data }));
      setOpenHistoryId(id);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  return (
    <div>
      <h3>Translations</h3>
      {units.map((unit) => (
        <div key={unit.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
          <p><strong>{unit.language_from} ➜ {unit.language_to}</strong></p>
          <p>Source: {unit.source_text}</p>
          <p>Translation: {unit.translated_text}</p>
          <button onClick={() => onEdit(unit)}>Edit</button>
          <button onClick={() => toggleHistory(unit.id)}>
            {openHistoryId === unit.id ? 'Hide History' : 'View History'}
          </button>

          {openHistoryId === unit.id && history[unit.id] && (
            <div style={{ marginTop: 10, background: '#f9f9f9', padding: 10 }}>
              <strong>History:</strong>
              {history[unit.id].length === 0 ? (
                <p>No history available.</p>
              ) : (
                <ul>
                  {history[unit.id].map((entry, index) => (
                    <li key={index}>
                      <em>{entry.updated_at}</em><br />
                      <span style={{ color: '#c00' }}>{entry.old_translated_text}</span>
                      <span style={{ color: '#090' }}> {entry.new_translated_text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TranslationList;