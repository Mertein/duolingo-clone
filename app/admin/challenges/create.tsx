"use client";
import {
  Create,
  TextInput,
  SimpleForm,
  required,
  ReferenceInput,
  NumberInput,
  SelectInput,
} from "react-admin";

const ChallengeCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

export default ChallengeCreate;
