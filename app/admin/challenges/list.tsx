"use client";
import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="question" />
        <SelectField
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
        />
        <ReferenceField source="lessonId" reference="lessons" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default ChallengeList;
