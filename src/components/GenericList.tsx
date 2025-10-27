import React from "react";

type GenericListProps<T> = {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
};

export default function GenericList<T>({
  items,
  keyExtractor,
  renderItem,
}: GenericListProps<T>) {
  return (
    <ul className="list-reset">
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
