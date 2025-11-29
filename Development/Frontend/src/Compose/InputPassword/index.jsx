const InputPassword = ({ onChangePassword }) => {
  return (
    <div className="input-field">
      <input
        className="input-field"
        type="password"
        placeholder="Digite a sua senha"
        onChange={(e) => onChangePassword(e.target.value)} // ← Manda a senha pro state
      />
    </div>
  );
};

export default InputPassword;
