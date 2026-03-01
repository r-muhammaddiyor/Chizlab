import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://json-api.uz/api/project/chizmachilik/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.access_token);

        console.log(data);
      });
  };

  return (
    <div style={{ width: '300px', margin: '100px auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
