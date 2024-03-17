import { FC } from "react";
import { Box, FormLabel } from "@chakra-ui/react";
import CheckBox from "./CheckBox";
import Select from "./Select";
import GenericInput from "./GenericInput";
import { ItemForm } from "../dynamicForm-types";

const Render: FC<ItemForm> = (props) => {
  return (
    <Box mb={4}>
      <FormLabel>{props.label}</FormLabel>
      {props.type === "group" ? (
        <Box ml={6}>
          {props.items.map((item) => (
            <Render
              key={`${props.name}.${item.name}`}
              {...item}
              name={`${props.name}.${item.name}`}
            />
          ))}
        </Box>
      ) : props.type === "checkbox" ? (
        <CheckBox {...props} />
      ) : props.type === "select" ? (
        <Select {...props} />
      ) : (
        <GenericInput {...props} />
      )}
    </Box>
  );
};

export default Render;
