import {
  Create,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="title"
          aria-required
          validate={[required()]}
          label="Title
        "
        />

        <ReferenceInput source="unitId" reference="units" />
        <NumberInput
          source="order"
          aria-required
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Create>
  );
};

export default LessonCreate;
