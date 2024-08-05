"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseEdit from "./course/edit";
import CourseCreate from "./course/create";
import CourseList from "./course/list";
import UnitList from "./unit/list";
import UnitCreate from "./unit/create";
import UnitEdit from "./unit/edit";
import LessonList from "./lessons/list";
import LessonCreate from "./lessons/create";
import LessonEdit from "./lessons/edit";
import ChallengeList from "./challenges/list";
import ChallengeCreate from "./challenges/create";
import ChallengeEdit from "./challenges/edit";
import ChallengeOptionsList from "./challengeOptions/list";
import ChallengeOptionsCreate from "./challengeOptions/create";
import ChallengeOptionsEdit from "./challengeOptions/edit";

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
      <Resource
        name="lessons"
        recordRepresentation={"title"}
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation={"question"}
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        name="challengeOptions"
        recordRepresentation={"text"}
        list={ChallengeOptionsList}
        create={ChallengeOptionsCreate}
        edit={ChallengeOptionsEdit}
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
