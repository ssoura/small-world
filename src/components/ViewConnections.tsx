import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import { ConnectionsType, PersonType } from "./Person";
import Connection from "./Connection";

interface ViewConnectionsProps {
  people: { [key: number]: PersonType };
  dispatch: Dispatch<ActionTypes>;
  from: number;
  to: number;
}

const ViewConnections = ({
  people,
  from,
  to,
  dispatch,
}: ViewConnectionsProps) => {
  const [mutualConnections, setMutualConnections] = useState<
    ConnectionsType[][] | null
  >(null);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch({
      type: e.target.name === "from" ? ACTIONS.SET_FROM : ACTIONS.SET_TO,
      payload: parseInt(e.target.value, 10),
    });

  useEffect(
    () =>
      dispatch({
        type: ACTIONS.SET_CLEAR_CONNECTIONS,
        payload: () => {
          setMutualConnections(null);
          dispatch({ type: ACTIONS.SET_FROM, payload: -1 });
          dispatch({ type: ACTIONS.SET_TO, payload: -1 });
        },
      }),
    []
  );

  const find = (
    source: ConnectionsType,
    visited: Set<string>,
    target: number,
    path: ConnectionsType[]
  ): void => {
    if (!path || !visited) return;
    const { id } = source;
    visited.add(people[id].name);
    path.push({ id });
    if (parseInt(`${id}`, 10) === target) {
      const tempPath = [...path];
      setMutualConnections((prev) => {
        const allPaths = [];
        if (!prev) {
          allPaths.push([...tempPath]);
          return allPaths;
        }
        return [...prev, [...tempPath]];
      });
    } else {
      people[id].connections.forEach((conn) => {
        if (visited.has(people[conn.id].name)) return;
        find(conn, visited, target, path);
      });
    }
    visited.delete(people[id].name);
    path.pop();
  };

  const findConnection = () => {
    if (from === -1 || to === -1) {
      alert(`Select Person ${from === -1 ? "1" : "2"}`);
      return;
    }
    setMutualConnections(null);
    const visited = new Set<string>();
    find({ id: from }, visited, to, []);
  };

  return (
    <div className="w-[60%] mx-2 mt-4 flex flex-col ">
      <div className="bg-main-500 p-2 px-4 rounded-xl w-auto">
        <p className="text-xl">View Degree of separation between two people</p>
      </div>
      <div className="p-4 flex gap-4 justify-center">
        <select
          id="from"
          name="from"
          value={from}
          onChange={handleChange}
          placeholder="Select Person 1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        >
          <option value={-1} disabled>
            Select Person 1
          </option>
          {Object.entries(people)?.map(([id, person]): JSX.Element | null => {
            if (!(parseInt(id, 10) !== to)) return null;
            return (
              <option key={id} value={id} className="px-2 py-1 ">
                {person.name}
              </option>
            );
          })}
        </select>

        <p className="px-1 py-2 text-lg">&</p>
        <select
          id="to"
          name="to"
          value={to}
          onChange={handleChange}
          placeholder="Select Person 2"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        >
          <option value={-1} disabled>
            Select Person 2
          </option>
          {Object.entries(people).map(([id, person]) => {
            if (!(parseInt(id, 10) !== from)) return null;
            return (
              <option key={id} value={id} className="px-2 py-1 ">
                {person.name}
              </option>
            );
          })}
        </select>
        <button
          type="button"
          className="focus:outline-none text-white bg-main-700 hover:bg-main-800 focus:ring-2 focus:ring-main-300 rounded-lg  px-5 py-2 m-1"
          onClick={findConnection}
        >
          Find
        </button>
      </div>
      <div
        className={`m-2 mb-8 py-2 w-full flex md:flex-col ${
          mutualConnections?.length && "bg-main-500 rounded-lg"
        }`}
      >
        {mutualConnections?.map((connections) => (
          <div
            key={connections.length + Math.random()}
            className="w-full flex flex-col md:flex-row items-center"
          >
            {connections.map((connection, connectionIndex) => (
              <Connection
                key={connection.id + Math.random()}
                hideArrow={connectionIndex === 0}
                name={people[connection.id].name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewConnections;
