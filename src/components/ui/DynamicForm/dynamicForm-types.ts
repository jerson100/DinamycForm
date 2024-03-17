import { Schema } from "yup";

export type GenericInputType = "text" | "email" | "password" | "number";

export type ItemForm = {
  type: GenericInputType | "select" | "checkbox" | "group";
  name: string;
  label?: string;
} & (
  | ({
      validations?: Schema;
    } & (CheckboxType | ((InputType | SelectType) & { placeholder?: string })))
  | GroupType
);

type InputType = {
  type: GenericInputType;
  defaultValue?: string | number | boolean;
};

export type CheckboxType = {
  type: "checkbox";
  defaultValue?: string[];
  options: Options[];
};

type SelectType = {
  type: "select";
  defaultValue?: string;
  options: Options[];
};

type GroupType = {
  type: "group";
  items: ItemForm[];
};

export interface Options {
  value: string;
  description: string;
}

export type GenericInputProps = InputType & {
  type: GenericInputType;
  name: string;
  placeholder?: string;
};

export type CheckBoxProps = CheckboxType & {
  name: string;
};

export type SelectProps = Pick<SelectType, "options"> & {
  name: string;
};
