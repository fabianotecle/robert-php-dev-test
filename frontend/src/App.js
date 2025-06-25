import React, { useState, useEffect } from 'react';
import TranslationForm from './TranslationForm';
import TranslationList from './TranslationList';

function App() {
  const [translations, setTranslations] = useState([]);
  const [editing, setEditing] = useState(null);

  // Busca as traduções da API
  const fetchTranslations = async () => {
    try {
      const res = await fetch('http://localhost/robert-php-dev-test/api/translations.php');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  // Função que envia o formulário para criar ou atualizar
  const handleFormSubmit = async (formData) => {
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = 'http://localhost/robert-php-dev-test/api/translations.php';
      const body = editing ? { ...formData, id: editing.id } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to submit');

      await fetchTranslations(); // Atualiza a lista depois do envio
      setEditing(null); // Limpa o estado de edição para voltar ao modo criar
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Passa para a lista a função que ativa a edição
  return (
    <div>
      <TranslationForm onSubmit={handleFormSubmit} initialData={editing} />
      <TranslationList translations={translations} onEdit={setEditing} />
    </div>
  );
}

export default App;