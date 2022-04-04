export interface IDropdownProps {
  options: IDropdownOptionObj[];
  selectedOption: ISelectedDropdownOptionObj;
  onSelect: (selectedOption: IDropdownOptionObj) => void;
  label: string;
}
export interface ISelectedDropdownOptionObj {
  id: string;
  value: string;
}
export interface IDropdownOptionObj extends ISelectedDropdownOptionObj {
  isDisabled: boolean;
}
