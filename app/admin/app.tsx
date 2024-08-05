"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseEdit from "./course/edit";
import CourseCreate from "./course/create";
import CourseList from "./course/list";
import UnitList from "./unit/list";
import UnitCreate from "./unit/create";
import UnitEdit from "./unit/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation={"title"}
        edit={CourseEdit}
        create={CourseCreate}
        list={CourseList}
      />
      <Resource
        name="units"
        recordRepresentation={"title"}
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
    </Admin>
  );
};

export default App;
