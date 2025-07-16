import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/ReelPlayLogo2.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email || !password || (signState === 'Sign Up' && !name)) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      alert("Authentication failed. Please try again.");
    }
    
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <div className="login-overlay">
        <img src={logo} className="login-logo" alt="ReelPlay Logo" />
        <div className="login-form">
          <h1>Welcome to ReelPlay</h1>
          <h2>{signState}</h2>
          <form onSubmit={user_auth}>
            {signState === 'Sign Up' && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">{signState}</button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          <div className="form-switch">
            {signState === 'Sign In' ? (
              <p>
                New to ReelPlay?
                <span onClick={() => setSignState('Sign Up')}> Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span onClick={() => setSignState('Sign In')}> Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
