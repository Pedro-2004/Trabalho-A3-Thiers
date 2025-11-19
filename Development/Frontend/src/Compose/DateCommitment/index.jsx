const DateCommitment = ({ onDateChange }) => {
  return (
    <>
      <input
        type="date"
        onChange={(event) => onDateChange(event.currentTarget.value)}
      />
    </>
  );
};

export default DateCommitment;
