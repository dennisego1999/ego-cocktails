"use client";

import { forwardRef } from "react";
import { ClickableListProps } from "./clickable-list-props";
import "./clickable-list.css";
import Text from "../../01_atoms/text/text";

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { items, renderItem, onItemClick, keyExtractor, className = "" } = props;

  if (items.length === 0) return null;

  const handleKeyDown = (item: T) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onItemClick(item);
    }
  };

  return (
    <ul
      ref={ref}
      className={`clickable-list ${className}`}
      role="listbox"
      data-border-radius="small"
    >
      {items.map((item) => (
        <li
          key={keyExtractor(item)}
          onClick={() => onItemClick(item)}
          onKeyDown={handleKeyDown(item)}
          className="clickable-list__item"
          role="option"
          aria-selected={false}
          tabIndex={0}
        >
          <Text>{renderItem(item)}</Text>
        </li>
      ))}
    </ul>
  );
}

// Preserve generic type when using forwardRef
export const ClickableList = forwardRef(ClickableListInner) as <T>(
  props: ClickableListProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> },
) => ReturnType<typeof ClickableListInner>;

export default ClickableList;
