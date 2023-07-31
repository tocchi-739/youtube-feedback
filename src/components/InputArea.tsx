interface props {
  type: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputArea = (props: props) => {
  const { type, name, handleChange, value } = props;
  return (
    <input
      type={type}
      name={name}
      onChange={handleChange}
      value={value}
      className="border p-2"
    />
  );
};
