import { useState, ChangeEvent, Dispatch } from "react";
import { PersonType } from "./Person";
import exampleData from "../data/exampleData";

import { ACTIONS, ActionTypes, stateType } from "../reducer";

interface AddPersonProps {
  state: stateType;
  dispatch: Dispatch<ActionTypes>;
}

const AddPerson = ({ state, dispatch }: AddPersonProps) => {
  const [name, setName] = useState<string>("");
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const loadSampleData = () => {
    state.clearConnections();
    dispatch({ type: ACTIONS.SET_PEOPLE, payload: exampleData });
  };
  const handleAddUser = () => {
    if (name === "") {
      alert("Please specify a name");
      return;
    }
    const person: PersonType = {
      name,
      connections: [],
    };
    dispatch({ type: ACTIONS.ADD_USER, payload: { id: Date.now(), person } });
    setName("");
  };
  return (
    <>
      {" "}
      <div className="flex items-center gap-1  px-2 md:px-2 py-2">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={handleNameChange}
          className="px-1 py-1 rounded-md bg-gray-700 text-black border-none outline-green-500"
        />
        <button
          type="button"
          className="focus:outline-none text-white bg-main-700 hover:bg-main-800 focus:ring-2 focus:ring-main-300 border-main-100 rounded-lg px-5 py-1"
          onClick={handleAddUser}
        >
          Add Person
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-main-700 hover:bg-main-800 focus:ring-2 focus:ring-main-300 rounded-lg px-5 py-1 "
          onClick={() => loadSampleData()}
        >
          Fill with Example
        </button>
      </div>
    </>
  );
};

export default AddPerson;
