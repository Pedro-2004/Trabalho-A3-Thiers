const InputEmail = ({ onChangeEmail }) => {
  return (
    <div className="input-field">
      <input
        className="input-field"
        type="email"
        placeholder="Digite o seu e-mail"
        onChange={(e) => onChangeEmail(e.target.value)} // ← Manda o valor pro state
      />
    </div>
  );
};

export default InputEmail;
