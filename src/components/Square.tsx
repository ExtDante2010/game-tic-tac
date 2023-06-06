interface ISquare {
  updateBoard?: () => void | undefined;
  index?: number;
  children?: React.ReactElement | React.ReactElement[];
  isSelected?: boolean;
  className?: string;
}

const Square = ({ children, isSelected, index, updateBoard }: ISquare) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
