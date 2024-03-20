export type InputProps = {
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeholder: string;
  value?: string | number;
  className?: string;
  type?: InputType;
  disabled?: boolean;
  variant?: InputVariant;
  fileTypes?: string[];
  maxLength?: number;
};

export enum InputVariant {
  search = "search",
}

export enum InputType {
  file = "file",
  text = "text",
}
