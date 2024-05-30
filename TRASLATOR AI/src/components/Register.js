import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el usuario en Firestore con permisos
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'basic'
      });

      navigate('/translator');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Guardar el usuario en Firestore con permisos
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'basic'
      });

      navigate('/translator');
    } catch (error) {
      setError('Google registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="banner">
        <h1>AI Translator</h1>
      </div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGoogleRegister}>Register with Google</button>
      {error && <p>{error}</p>}
      <div className="login-link">
        <p>You have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;
