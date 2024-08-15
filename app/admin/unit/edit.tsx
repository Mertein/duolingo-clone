"use client";
import {
  Edit,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source={"id"} validate={[required()]} label="ID" />
        <TextInput
          source="title"
          aria-required
          validate={[required()]}
          label="title
        "
        />
        <TextInput
          source="description"
          aria-required
          validate={[required()]}
          label="Description"
        />
        <ReferenceInput source="courseId" reference={"courses"} />
        <NumberInput
          source="order"
          aria-required
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  );
};

export default UnitEdit;
