import React, { useState } from 'react';
import Header from '../components/Header'
import Login from './LoginPage'
import Register from './RegisterPage'
export default function Home() {
  const [currentForm, setCurrentform] = useState('login');
  const toggleform = (formName) => {
    setCurrentform(formName);
  }
  return (
    <div className="App">
      <Header />
      {
        (currentForm === 'login') ? <Login onFormSwitch={toggleform} /> : <Register onFormSwitch={toggleform} />
      }
    </div>
  );
}