const InputPassword = ({ onChangePassword }) => {
  return (
    <div className="input-field">
      <input
        className="input-field"
        type="password"
        placeholder="Digite a sua senha"
        onChange={(event) => onChangePassword(event.target.value)}
      />
    </div>
  );
};

export default InputPassword;
