import React, { ChangeEvent, useState } from "react";
import { BsPersonPlusFill, BsPersonDashFill } from "react-icons/bs";

import GradientBox from "./ui/GradientBox";

export type ConnectionsType = {
  id: number;
};

export type PersonType = {
  name: string;
  connections: ConnectionsType[];
};

interface PersonProps {
  id: number;
  person: PersonType;
  people: { [id: number]: PersonType };
  connect: (personToId: number) => void;
  deletePerson: () => void;
}

const Person = ({ id, person, people, connect, deletePerson }: PersonProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const [connection, setConnection] = useState<ConnectionsType>({ id: -1 });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setConnection({ ...connection, [e.target.name]: e.target.value });

  const handleConnectClick = () => {
    if (connection.id === -1) {
      alert("Select a Person");
      return;
    }
    connect(parseInt(`${connection.id}`, 10));
  };
  return (
    <div className="px-2 py-4 flex flex-col md:flex-row  justify-between items-center">
      <div className="flex items-center my-2">
        <GradientBox key={person.name} text={`${person.name}`} />
        <p className="px-2">is a friend of</p>
        <div className="flex gap-3 flex-wrap">
          {person.connections.map((personConnection) => (
            <GradientBox
              key={personConnection.id}
              text={`${people[personConnection.id].name}`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setShowModal(true)}>
          <BsPersonPlusFill size={26} />
        </button>
        {showModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    Add Connection
                  </h3>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="flex gap-4 my-2">
                    <select
                      id="personTo"
                      name="id"
                      value={connection.id}
                      onChange={handleChange}
                      placeholder="Select Person"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    >
                      <option value={-1} disabled>
                        Select Person
                      </option>
                      {people &&
                        Object.entries(people)
                          .filter(([personId]) => id !== parseInt(personId, 10))
                          .map(([idTo, personTo]) => (
                            <option
                              key={idTo}
                              value={idTo}
                              className="px-2 py-1 "
                            >
                              {personTo.name}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleConnectClick}
                  >
                    connect
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <button className="p-2" type="submit" onClick={deletePerson}>
          <BsPersonDashFill size={26} />
        </button>
      </div>
    </div>
  );
};

export default Person;
