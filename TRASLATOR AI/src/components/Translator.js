// src/components/Translator.js
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');

  const handleTranslate = async () => {
    setStatus('translating...');
    setResult('');
    try {
      console.log('Sending data:', {
        prompt: prompt,
      });
      const response = await axios.post('http://154.16.171.222:8000/translate', {
        prompt: prompt,
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
