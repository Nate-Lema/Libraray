import { createContext } from "react";
import { IBook } from "./IBook";
import { IAuthor } from "./IAuthor";
import { IPublisher } from "./IPublisher";
import { IMember } from "./IMember";

interface IContext {
  books: IBook[];
  setBooks: (books: IBook[]) => void;
  authors: IAuthor[];
  setAuthors: (authors: IAuthor[]) => void;
  publishers: IPublisher[];
  setPublishers: (publishers: IPublisher[]) => void;
  members: IMember[];
  setMembers: (members: IMember[]) => void;
  setLoggedIn: (loggedIn: boolean) => void
}
const GlobalContext = createContext<IContext>({
  books: [],
  setBooks: () => { },
  authors: [],
  setAuthors: () => { },
  publishers: [],
  setPublishers: () => { },
  members: [],
  setMembers: () => { },
  setLoggedIn: () => { }
});
export default GlobalContext;
