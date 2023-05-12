function UserDataForm({ buttonText, handleSubmit, handleChangeEmail, handleChangePassword, email, password }) {
  return (
    <form className="register__form" onSubmit={handleSubmit}>
      <input id="email-input" type="email" name="email" placeholder="Email" className="register__form_input"
            minLength="2" maxLength="100" required value={email || ""} onChange={handleChangeEmail}/>
      <span className="email-input-error"></span>
      <input id="password-input" type="password" name="password" placeholder="Пароль"
            className="register__form_input" minLength="2" maxLength="100" required value={password || ""} onChange={handleChangePassword}/>
      <span className="password-input-error"></span>
      <button type="submit" className="register__submit-button">{buttonText}</button>
    </form>
  )
}

export default UserDataForm;