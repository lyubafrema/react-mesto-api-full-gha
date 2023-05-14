import { useState } from "react";
import { Link } from "react-router-dom";
import UserDataForm from "./UserDataForm";

function Register({ onRegister }) {
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
    resetForm();
    onRegister({ email, password });
  }

  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <UserDataForm
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        email={email}
        password={password}>
      </UserDataForm>
      <div className="register__log-in">
        <p className="register__log-in_title">Уже зарегистрированы? <Link to="/signin" className="register__log-in_link">Войти</Link></p>
      </div>
    </div >
  )
}

export default Register;