import {
  Create,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
  SelectInput,
  BooleanInput,
} from "react-admin";

const ChallengeOptionsCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="text"
          aria-required
          validate={[required()]}
          label="Text
        "
        />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" label="Image URL" />
        <TextInput source="audioSrc" label="Audio URL" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeOptionsCreate;
