"use client";
import {
  Edit,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const LessonEdit = () => {
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
        <ReferenceInput source="unitId" reference={"units"} />
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

export default LessonEdit;
