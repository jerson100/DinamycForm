import { FC, memo, useId } from "react";
import { CheckBoxProps } from "../dynamicForm-types";
import {
  Checkbox as CheckBoxItem,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const CheckBox: FC<CheckBoxProps> = ({ name, options }) => {
  const { register, formState } = useFormContext();
  const errorMessage = formState.errors[name]?.message;
  const id = useId();
  const sanityMessage =
    typeof errorMessage === "string"
      ? errorMessage
      : errorMessage instanceof Array
      ? errorMessage.join(", ")
      : "";
  return (
    <FormControl isInvalid={!!errorMessage}>
      {options?.map((option, index) => {
        return (
          <CheckBoxItem
            key={index}
            {...register(name)}
            value={option.value}
            mr={5}
            id={`${id}-${index}`}
          >
            {option.description}
          </CheckBoxItem>
        );
      })}
      <FormErrorMessage>{sanityMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default memo(CheckBox);
