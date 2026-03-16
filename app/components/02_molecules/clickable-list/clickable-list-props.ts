export type ClickableListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
  keyExtractor: (item: T) => string;
  className?: string;
};
