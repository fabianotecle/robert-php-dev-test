import React, { useState } from 'react';
import TranslationForm from './TranslationForm';
import TranslationList from './TranslationList';

const App = () => {
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (form) => {
    const url = 'http://localhost/api/translations.php';
    const method = editing ? 'PUT' : 'POST';

    const payload = editing
      ? { id: editing.id, translated_text: form.translated_text }
      : form;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    alert(result.message || 'Done!');
    setEditing(null);
    window.location.reload(); // ou refaz o fetch de forma elegante depois
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Robert CAT Tool</h1>
      <TranslationForm onSubmit={handleSubmit} initialData={editing} />
      <hr />
      <TranslationList onEdit={setEditing} />
    </div>
  );
};

export default App;