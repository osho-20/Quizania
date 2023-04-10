import React, { useState } from 'react';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Login from './LoginPage'
import Register from './RegisterPage'
export default function Home() {
  const [currentForm, setCurrentform] = useState('login');
  const navg = useNavigate();
  const user = auth?.currentUser;
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