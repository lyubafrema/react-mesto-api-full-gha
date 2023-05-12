import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataForm from "./UserDataForm";

function Login ({ onLogin }) {
  const navigate = useNavigate();
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

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm()
    onLogin({email, password});
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