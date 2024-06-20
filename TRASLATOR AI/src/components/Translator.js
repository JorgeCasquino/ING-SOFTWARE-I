// src/components/Translator.js
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [prompt, setPrompt] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('French');
  const [result, setResult] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate/', {
        prompt: prompt,
        source_language: sourceLanguage,
        target_language: targetLanguage
      });
      setResult(response.data.text);
    } catch (error) {
      console.error('Error al traducir:', error);
    }
  };

  return (
    <div>
      <h1>Translator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div>
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
        <label>
          To:
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            {/* Añadir más opciones de idioma según sea necesario */}
          </select>
        </label>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <div>
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Translator;
