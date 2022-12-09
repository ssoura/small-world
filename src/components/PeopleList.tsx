import { Dispatch } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import Person, { PersonType } from "./Person";

interface PeopleListProps {
  people: { [key: number]: PersonType };
  dispatch: Dispatch<ActionTypes>;
}

const PeopleList = ({ people, dispatch }: PeopleListProps) => {
  const deletePerson = (id: number) =>
    dispatch({ type: ACTIONS.REMOVE_USER, payload: id });
  return (
    <div className=" w-[60%] mt-6 flex flex-col gap-2">
      <div className="bg-main-500 p-2 px-4 rounded-xl w-auto">
        <p className="text-xl text-bold">Relationships</p>
      </div>
      {Object.keys(people).length ? (
        Object.entries(people).map(([id, person]) => (
          <Person
            key={id}
            id={parseInt(id, 10)}
            people={people}
            person={person}
            deletePerson={() => deletePerson(parseInt(id, 10))}
            connect={(personToId: number) => {
              if (
                person.connections.some(
                  (conn) => parseInt(`${conn.id}`, 10) === personToId
                )
              )
                return;
              dispatch({
                type: ACTIONS.UPDATE_USER,
                payload: {
                  id: parseInt(id, 10),
                  person: {
                    ...person,
                    connections: [...person.connections, { id: personToId }],
                  },
                },
              });
              dispatch({
                type: ACTIONS.UPDATE_USER,
                payload: {
                  id: personToId,
                  person: {
                    ...people[personToId],
                    connections: [
                      ...people[personToId].connections,
                      { id: parseInt(id, 10) },
                    ],
                  },
                },
              });
            }}
          />
        ))
      ) : (
        <div className="my-2 flex justify-center text-3xl underline">
          Add Users from below to find connections...
        </div>
      )}
    </div>
  );
};

export default PeopleList;
