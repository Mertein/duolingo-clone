import {
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  BooleanInput,
  Edit,
} from "react-admin";

const ChallengeOptionsEdit = () => {
  return (
    <Edit>
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
    </Edit>
  );
};

export default ChallengeOptionsEdit;
