import { Container } from "@chakra-ui/react";
import DynamicForm from "./components/ui/DynamicForm";
import {
  ItemForm,
  Options,
} from "./components/ui/DynamicForm/dynamicForm-types";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

function App() {
  const checkBoxOptions: Options[] = [
    { value: uuid(), description: "Accept" },
    { value: uuid(), description: "Reject" },
    { value: uuid(), description: "Other" },
  ];

  const inputs: ItemForm[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      validations: Yup.string()
        .min(4, "El nombre debe tener al menos 4 carácteres.")
        .matches(/^[a-zA-Z ]*$/, "El nombre solo puede contener letras.")
        .required("Name is required"),
    },
    {
      name: "password1",
      type: "password",
      label: "Password",
      placeholder: "Ingrese una contraseña",
      validations: Yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra y un número."
      ),
    },
    {
      name: "password2",
      type: "password",
      label: "Password2",
      placeholder: "Repite la contraseña",
      validations: Yup.string()
        .oneOf([Yup.ref("password1")], "Passwords must match")
        .required("Password2 is required"),
    },
    {
      name: "terms",
      type: "checkbox",
      label: "Accept terms",
      defaultValue: [checkBoxOptions[0].value, checkBoxOptions[2].value],
      options: checkBoxOptions,
      validations: Yup.array().min(2, "You must accept at least 2 elements"),
    },
    {
      name: "departament",
      type: "group",
      label: "Departamento",
      items: [
        {
          name: "province",
          type: "text",
          label: "Name",
          placeholder: "Enter your province",
        },
        {
          name: "other",
          type: "group",
          label: "Otro grupo",
          items: [
            {
              name: "other2",
              type: "text",
              label: "Otherrr",
              placeholder: "Other",
            },
            {
              name: "other3",
              type: "text",
              label: "Otherrr3",
              placeholder: "Other",
              validations: Yup.string().required("Other3 is required"),
            },
          ],
        },
      ],
    },
  ];
  return (
    <Container maxW={"3xl"}>
      <DynamicForm
        items={inputs}
        onSubmit={(data) => {
          console.log(data);
        }}
        title="My form"
      ></DynamicForm>
    </Container>
  );
}

export default App;
