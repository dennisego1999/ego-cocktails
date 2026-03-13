import { ReactNode } from "react";

type PopoverMenuProps = {
  id: string;
  children: ReactNode;
  onToggle?: (isOpen: boolean) => void;
};

export default PopoverMenuProps;
