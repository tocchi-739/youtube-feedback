interface props {
  handleClick: () => void;
  buttonText: string;
}

export const Button = (props: props) => {
  const { handleClick, buttonText } = props;
  return (
    <button onClick={handleClick} className="border p-2">
      {buttonText}
    </button>
  );
};
