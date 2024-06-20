// src/components/Translator.js
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [prompt, setPrompt] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');

  const handleTranslate = async () => {
    setStatus('translating...');
    setResult('');
    try {
      const response = await axios.post('http://localhost:8000/generate/', {
        prompt: prompt,
        source_language: sourceLanguage,
        target_language: targetLanguage
      });
      console.log('Response data:', response.data);
      setResult(response.data.text);
      setStatus('');
    } catch (error) {
      console.error('Error al traducir:', error);
      if (error.response && error.response.status === 503) {
        setStatus('Model is loading, please try again in a few seconds...');
        setTimeout(handleTranslate, 20000);  // Intentar nuevamente después de 20 segundos
      } else {
        setStatus('translation error');
      }
    }
  };

  return (
    <div className="translator-container">
      <div className="banner">
        <h1>Translator</h1>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div className="language-selectors">
        <div className="language-selector">
          <label>
            From:
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              {/* Añadir más opciones de idioma según sea necesario */}
            </select>
          </label>
        </div>
        <div className="language-selector">
          <label>
            To:
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              {/* Añadir más opciones de idioma según sea necesario */}
            </select>
          </label>
        </div>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <textarea
        value={status ? status : result}
        readOnly
        placeholder="Translation result"
      />
    </div>
  );
};

export default Translator;
