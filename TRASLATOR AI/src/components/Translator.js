import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { HfInference } from "@huggingface/inference";


const Translator = () => {
  const { currentUser, handleLogout } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translationResult, setTranslationResult] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentUser) {
      const displayName = currentUser.displayName;
      const email = currentUser.email;
      setUserName(displayName ? displayName : email);
    }
  }, [currentUser]);

  const hf = new HfInference("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");

  const translateText = async () => {
    try {
      setIsTranslating(true);
      const model = 'facebook/mbart-large-50-many-to-many-mmt';
      const translation = await hf.translation({
        model,
        inputs: inputText,
        parameters: {
          "src_lang": sourceLanguage,
          "tgt_lang": targetLanguage
        }
      });
      setTranslationResult(translation.translation_text);
      setIsTranslating(false);
    } catch (error) {
      console.error("Error:", error);
      setIsTranslating(false);
    }
  };

  const languages = [
    { code: "", name: "Select Language" },
    { code: "en_XX", name: "English" },
    { code: "", name: "..." },
    { code: "af_ZA", name: "Afrikaans" },
    { code: "ar_AR", name: "Arabic" },
    { code: "az_AZ", name: "Azerbaijani" },
    { code: "bn_IN", name: "Bengali" },
    { code: "zh_CN", name: "Chinese" },
    { code: "hr_HR", name: "Croatian" },
    { code: "cs_CZ", name: "Czech" },
    { code: "nl_XX", name: "Dutch" },
    { code: "en_XX", name: "English" },
    { code: "et_EE", name: "Estonian" },
    { code: "fi_FI", name: "Finnish" },
    { code: "fr_XX", name: "French" },
    { code: "gl_ES", name: "Galician" },
    { code: "de_DE", name: "German" },
    { code: "el_GR", name: "Greek" },
    { code: "gu_IN", name: "Gujarati" },
    { code: "he_IL", name: "Hebrew" },
    { code: "hi_IN", name: "Hindi" },
    { code: "hu_HU", name: "Hungarian" },
    { code: "id_ID", name: "Indonesian" },
    { code: "it_IT", name: "Italian" },
    { code: "ja_XX", name: "Japanese" },
    { code: "ka_GE", name: "Georgian" },
    { code: "km_KH", name: "Khmer" },
    { code: "ko_KR", name: "Korean" },
    { code: "lv_LV", name: "Latvian" },
    { code: "lt_LT", name: "Lithuanian" },
    { code: "mk_MK", name: "Macedonian" },
    { code: "ms_MY", name: "Malay" },
    { code: "ml_IN", name: "Malayalam" },
    { code: "mr_IN", name: "Marathi" },
    { code: "mn_MN", name: "Mongolian" },
    { code: "my_MM", name: "Burmese" },
    { code: "ne_NP", name: "Nepali" },
    { code: "no_NO", name: "Norwegian" },
    { code: "ps_AF", name: "Pashto" },
    { code: "fa_IR", name: "Persian" },
    { code: "pl_PL", name: "Polish" },
    { code: "pt_XX", name: "Portuguese" },
    { code: "pa_IN", name: "Punjabi" },
    { code: "ro_RO", name: "Romanian" },
    { code: "ru_RU", name: "Russian" },
    { code: "sr_RS", name: "Serbian" },
    { code: "si_LK", name: "Sinhala" },
    { code: "sk_SK", name: "Slovak" },
    { code: "sl_SI", name: "Slovene" },
    { code: "es_XX", name: "Spanish" },
    { code: "sw_KE", name: "Swahili" },
    { code: "sv_SE", name: "Swedish" },
    { code: "tl_XX", name: "Tagalog" },
    { code: "ta_IN", name: "Tamil" },
    { code: "te_IN", name: "Telugu" },
    { code: "th_TH", name: "Thai" },
    { code: "tr_TR", name: "Turkish" },
    { code: "uk_UA", name: "Ukrainian" },
    { code: "ur_PK", name: "Urdu" },
    { code: "vi_VN", name: "Vietnamese" },
    { code: "cy_GB", name: "Welsh" },
    { code: "xh_ZA", name: "Xhosa" },
    { code: "yo_NG", name: "Yoruba" },
    { code: "zu_ZA", name: "Zulu" }

  ];


  if (!currentUser) {
    return <div className="translator-container">Auth Required</div>;
  }

  return (
    <div className="translator-container">
      <div className="user-info">
        <p>Hello, {userName}</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
        className="text-area"
      />
      <div className="language-selectors">
        <div className="language-selector">
          <label>Source Language:</label>
          <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} className="select-box">
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
        <div className="language-selector">
          <label>Target Language:</label>
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className="select-box">
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={translateText} className="translate-button">Translate</button>
      <div>
        <label>Translation:</label>
        <textarea
          value={isTranslating ? 'Translating...' : translationResult}
          readOnly
          className="translated-text"
          placeholder={isTranslating ? 'Translating...' : 'Translation will appear here'}
        />
      </div>
    </div>
  );
};

export default Translator;
