import { useState } from "react";
import UserDataForm from "./UserDataForm";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm()
    onLogin({ email, password });
  }

  return (
    <div className="register">
      <h3 className="register__title">Вход</h3>
      <UserDataForm
        buttonText="Войти"
        handleSubmit={handleSubmit}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        email={email}
        password={password}>
      </UserDataForm>
    </div >
  )
}

export default Login;