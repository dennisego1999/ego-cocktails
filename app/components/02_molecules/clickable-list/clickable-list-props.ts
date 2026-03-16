// app/components/02_molecules/clickable-list/clickable-list-props.ts
export type ClickableListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
  keyExtractor: (item: T) => string;
  className?: string;
};
