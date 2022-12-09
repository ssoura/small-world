import { PersonType } from "../components/Person";

export const ACTIONS = {
  SET_PEOPLE: "SET_PEOPLE",
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
  SET_CLEAR_CONNECTIONS: "SET_CLEAR_CONNECTIONS",
};

export interface stateType {
  people: { [id: number]: PersonType };
  from: number;
  to: number;
  clearConnections: () => void;
}

type ActionSetPeople = {
  type: typeof ACTIONS.SET_PEOPLE;
  payload: { [id: string]: PersonType };
};

type ActionAddUser = {
  type: typeof ACTIONS.ADD_USER;
  payload: { id: number; person: PersonType };
};

type ActionRemoveUser = {
  type: typeof ACTIONS.REMOVE_USER;
  payload: number;
};

type ActionUpdateUser = {
  type: typeof ACTIONS.UPDATE_USER;
  payload: { id: number; person: PersonType };
};

type ActionSetFrom = {
  type: typeof ACTIONS.SET_FROM;
  payload: number;
};

type ActionSetTo = {
  type: typeof ACTIONS.SET_TO;
  payload: number;
};

type ActionSetClearConnection = {
  type: typeof ACTIONS.SET_CLEAR_CONNECTIONS;
  payload: () => void;
};

export type ActionTypes =
  | ActionSetPeople
  | ActionAddUser
  | ActionRemoveUser
  | ActionUpdateUser
  | ActionSetFrom
  | ActionSetTo
  | ActionSetClearConnection;

const saveToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

const fetchFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const initialState: stateType = {
  people: JSON.parse(fetchFromLocalStorage("people") ?? "{}"),
  from: -1,
  to: -1,
  clearConnections: () => null,
};

const reducer = (state: stateType, action: ActionTypes): stateType => {
  const { type, payload } = action;
  let people;
  switch (type) {
    case ACTIONS.SET_PEOPLE:
      saveToLocalStorage(
        "people",
        JSON.stringify({
          ...(payload as ActionSetPeople["payload"]),
        }),
      );
      return { ...state, people: payload as ActionSetPeople["payload"] };

    case ACTIONS.ADD_USER:
      saveToLocalStorage(
        "people",
        JSON.stringify({
          ...state.people,
          [(payload as ActionAddUser["payload"]).id]: (payload as ActionAddUser["payload"]).person,
        }),
      );
      return {
        ...state,
        people: {
          ...state.people,
          [(payload as ActionAddUser["payload"]).id]: (payload as ActionAddUser["payload"]).person,
        },
      };

    case ACTIONS.REMOVE_USER:
      state.clearConnections();
      people = Object.entries(state.people).reduce(
        (acc, [id, person]) => ({
          ...acc,
          [id]: {
            ...person,
            connections: person.connections.filter(
              (conn) => parseInt(`${conn.id}`, 10) !== payload,
            ),
          },
        }),
        { ...state.people },
      );
      delete people[(action as ActionRemoveUser).payload];
      saveToLocalStorage("people", JSON.stringify(people));
      return { ...state, people };

    case ACTIONS.UPDATE_USER:
      people = { ...state.people };
      people[(payload as ActionUpdateUser["payload"]).id] = (
        payload as ActionUpdateUser["payload"]
      ).person;
      saveToLocalStorage("people", JSON.stringify(people));
      return { ...state, people };

    case ACTIONS.SET_FROM:
      return { ...state, from: payload as ActionSetFrom["payload"] };

    case ACTIONS.SET_TO:
      return { ...state, to: payload as ActionSetTo["payload"] };

    case ACTIONS.SET_CLEAR_CONNECTIONS:
      return { ...state, clearConnections: payload as ActionSetClearConnection["payload"] };

    default:
      return state;
  }
};

export default reducer;
