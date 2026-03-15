type SearchBarProps = {
  onSubmit: (query: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default SearchBarProps;
