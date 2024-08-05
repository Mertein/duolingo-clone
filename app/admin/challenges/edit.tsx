import {
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
  SelectInput,
  Edit,
} from "react-admin";

const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="question"
          aria-required
          validate={[required()]}
          label="Question
        "
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSITS",
              name: "ASSITS",
            },
          ]}
          validate={[required()]}
        />

        <ReferenceInput source="lessonId" reference="lessons" />
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

export default ChallengeEdit;
