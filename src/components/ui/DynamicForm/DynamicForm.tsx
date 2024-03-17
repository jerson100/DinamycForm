import { Button, Stack } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ItemForm, Options } from "./dynamicForm-types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Render from "./components/Render";
import _ from "lodash";

export interface FormProps {
  title: string;
  onSubmit: (data: unknown) => void;
  submitText?: string;
  items: ItemForm[];
}

const DynamicForm: FC<FormProps> = ({
  onSubmit,
  //   title,
  submitText = "Buscar",
  items,
}) => {
  //   const values = useMemo(() => {
  //     const values: Record<string, string | number | boolean | Options[]> = {};
  //     const defaultValues: Record<string, string | number | boolean | string[]> =
  //       {};
  //     inputs.forEach(({ name, value, type, options, defaultValue }) => {
  //       values[name] =
  //         type === "checkbox" || type === "select" ? options ?? [] : value;
  //       if (defaultValue) defaultValues[name] = defaultValue;
  //     });
  //     return { values, defaultValues };
  //   }, [items]);

  const validations = useMemo(() => {
    const obj = {} as any;
    const validationsSchemas: { [key: string]: Yup.Schema } = {};
    const recursiveValidations = (items: ItemForm[], name = "") => {
      items.forEach((item) => {
        const newName = name !== "" ? `${name}.${item.name}` : item.name;
        if (item.type !== "group") {
          if (item.validations) {
            validationsSchemas[newName] = item.validations;
          }
        } else {
          recursiveValidations(item.items, newName);
        }
      });
    };
    recursiveValidations(items, "");
    for (let k in validationsSchemas) {
      const stringSplited = k.split(".");
      if (stringSplited.length > 1) {
        let previous = {} as any;
        for (let i = stringSplited.length - 1; i >= 0; i--) {
          const newKey = stringSplited[i];
          if (i === stringSplited.length - 1) {
            previous = {
              [newKey]: validationsSchemas[k],
            };
          } else {
            const c = { [newKey]: Yup.object(previous) };
            previous = c;
          }
        }
        obj[stringSplited[0]] = Object.values(previous)[0];
      } else {
        obj[k] = validationsSchemas[k];
      }
    }
    return Yup.object(obj);
  }, [items]);

  const instance = useForm({
    resolver: yupResolver(validations),
    // defaultValues: values.defaultValues,
  });

  return (
    <FormProvider {...instance}>
      <form onSubmit={instance.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {items.map((item) => (
            <Render key={item.name} {...item} />
          ))}
        </Stack>
        <br />
        <Button type="submit">{submitText}</Button>
      </form>
    </FormProvider>
  );
};

export default DynamicForm;
