import { Create, TextInput, SimpleForm, required } from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

export default CourseCreate;
