import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { GenericInputProps } from "../dynamicForm-types";
import _ from "lodash";

const GenericInput: FC<GenericInputProps> = ({ name, type, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = _.get(errors, name)?.message;
  const sanityMessage =
    typeof errorMessage === "string"
      ? errorMessage
      : errorMessage instanceof Array
      ? errorMessage.join(", ")
      : "";
  const _props = {
    ...(type === "password" ? { autoComplete: "new-password" } : {}),
    type,
  };
  return (
    <>
      <FormControl isInvalid={!!errorMessage}>
        <Input
          placeholder={placeholder}
          aria-label={name}
          {...register(name)}
          {..._props}
        />
        <FormErrorMessage>{sanityMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default GenericInput;
