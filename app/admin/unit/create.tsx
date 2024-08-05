import {
  Create,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const UnitCreate = () => {
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
        <TextInput
          source="description"
          aria-required
          validate={[required()]}
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />
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

export default UnitCreate;
