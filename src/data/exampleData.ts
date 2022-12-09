import { PersonType } from "../components/Person";

const exampleData: { [id: string]: PersonType } = {
  "6378": {
    name: "Sameer",
    connections: [
      {
        id: 8360,
      },
      {
        id: 1243,
      },
    ],
  },
  "8360": {
    name: "Aayushi",
    connections: [
      {
        id: 6378,
      },
      {
        id: 1721,
      },
    ],
  },
  "1721": {
    name: "Bhaskar",
    connections: [
      {
        id: 8360,
      },
      {
        id: 1823,
      },
    ],
  },
  "1823": {
    name: "Shanti Kumar Saha",
    connections: [
      {
        id: 1243,
      },
      {
        id: 1721,
      },
    ],
  },
  "1243": {
    name: "Kamal Nath Sharma",
    connections: [
      {
        id: 6378,
      },
      {
        id: 1823,
      },
    ],
  },
};
export default exampleData;
