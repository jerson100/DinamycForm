import { FC } from "react";
import { Select as SelectChakraUI } from "@chakra-ui/react";
import { SelectProps } from "../dynamicForm-types";
import { useFormContext } from "react-hook-form";

const Select: FC<SelectProps> = ({ name, options }) => {
  const { register } = useFormContext();
  return (
    <SelectChakraUI {...register(name)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.description}
        </option>
      ))}
    </SelectChakraUI>
  );
};

export default Select;
