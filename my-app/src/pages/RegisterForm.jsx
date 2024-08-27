import React, { useState, useEffect } from 'react';
import './registerForm.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [id, setId] = useState(0); // Начальное значение ID
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа пароля

  // Используем useEffect для загрузки последнего ID из localStorage
  useEffect(() => {
    const storedId = localStorage.getItem('lastUserId');
    if (storedId) {
      setId(Number(storedId)); // Устанавливаем ID из localStorage
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    // Проверка на уникальность электронной почты
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      setError('Пользователь с таким email уже зарегистрирован');
      return;
    }

    setError('');
    const newId = id + 1; // Увеличиваем ID на единицу
    console.log('Регистрация:', { id: newId, username, password, email });

    // Сохраняем нового пользователя в localStorage
    users.push({ id: newId, username, password, email });
    localStorage.setItem('users', JSON.stringify(users));

    // Сохраняем новый ID в localStorage
    localStorage.setItem('lastUserId', newId);

    // Обновляем состояние ID
    setId(newId);

    // Отправка данных на сервер (пример)
    try {
      const response = await fetch("https://123.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newId, username, password, email }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при регистрации');
      }

      const data = await response.json();
      console.log('Ответ сервера:', data);
      // Здесь вы можете добавить логику для обработки успешной регистрации
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Не удалось зарегистрироваться. Попробуйте еще раз.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            className="UserName"
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <input
            className="Password"
            type={showPassword ? 'text' : 'password'} // Изменение типа в зависимости от состояния
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
          <button
            className="ButtonState"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        </label>
      </div>
      <div>
        <label>
          <input
            className="ConfirmPassword"
            type={showPassword ? 'text' : 'password'} // Изменение типа в зависимости от состояния
            value={confirmPassword}
            placeholder="Подтверждение пароля"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <input
            className="Email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Зарегистрироваться</button>
      <div>
        <Link to="/login">Уже есть аккаунт?</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
