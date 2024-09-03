import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        // запрос параметров на вход
        const url = new URL('https://123.com/login'); // эндпоинт
        url.searchParams.append('email', email);
        url.searchParams.append('password', password);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Неверный email или пароль'); // обработка ошибок
        }

        const user = await response.json();
        console.log('Успешный вход:', user);
        navigate('/main'); // успешный вход
    } catch (error) {
        setError(error.message);
    }
};


  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
      <p>
        <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default LoginForm;
