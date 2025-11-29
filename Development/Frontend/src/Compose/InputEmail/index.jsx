const InputEmail = ({ onChangeEmail }) => {
  return (
    <div className="input-field">
      <input
        className="input-field"
        type="email"
        placeholder="Digite o seu e-mail"
        onChange={(event) => onChangeEmail(event.target.value)}
      />
    </div>
  );
};

export default InputEmail;
