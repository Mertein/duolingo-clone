import { Edit, TextInput, SimpleForm, required } from "react-admin";

const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="title"
          aria-required
          validate={[required()]}
          label="title
        "
        />
        <TextInput
          source="imageSrc"
          aria-required
          validate={[required()]}
          label="image"
        />
      </SimpleForm>
    </Edit>
  );
};

export default UnitEdit;
