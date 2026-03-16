// app/components/02_molecules/clickable-list/clickable-list.tsx
"use client";

import { forwardRef } from "react";
import { ClickableListProps } from "./clickable-list-props";
import "./clickable-list.css";

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { items, renderItem, onItemClick, keyExtractor, className = "" } = props;

  if (items.length === 0) return null;

  return (
    <ul ref={ref} className={`clickable-list ${className}`}>
      {items.map((item) => (
        <li
          key={keyExtractor(item)}
          onClick={() => onItemClick(item)}
          className="clickable-list__item"
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = forwardRef(ClickableListInner) as <T>(
  props: ClickableListProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> },
) => ReturnType<typeof ClickableListInner>;

export default ClickableList;
