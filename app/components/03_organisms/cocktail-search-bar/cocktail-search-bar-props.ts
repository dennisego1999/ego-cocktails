type CocktailSearchBarProps = {
  onSubmit: (query: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default CocktailSearchBarProps;
