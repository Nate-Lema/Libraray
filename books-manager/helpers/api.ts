import axios from 'axios';
import { IBook } from './IBook';
import { IAuthor } from './IAuthor';
import { IMember } from './IMember';
import { IPublisher } from './IPublisher';
import ITransaction from './ITransaction';
import ICatalog from './ICatalog';


axios.defaults.baseURL = "http://localhost:3002";

/* Books */

export const getBooks = async () => {
    try {
        const response = await axios.get("/books");
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

export const updateBook = async (id: string, book: IBook) => {
    try {
        const response = await axios.put(`/books/${id}`, book);
        return response.data;
    } catch (error) {
        console.error(`Error updating book with ID ${id}:`, error);
        return null;
    }
};

export const deleteBook = async (id: string) => {
    try {
        const response = await axios.delete(`/books/${id}`);
        if (response.status === 200) {
            return true
        }
    } catch (error) {
        console.error(`Error deleting books with ID ${id}:`, error);
    }
    return false;
};

export const addBook = async (book: IBook) => {
    try {
        const response = await axios.post(`/books`, book);
        return response.data;
    } catch (error) {
        console.error("Error adding course:", error);
        return null;
    }
};

export const isEligibleUser = async (email: string) => {
    try {
        const response = await axios.get(`/users?email=${email}`);
        if (response.status === 200 && response.data.length > 0) {
            return true
        }
    } catch (error) {
        console.error("Error adding books:", error);
    }
    return false
};

/* Authors */

export const getAuthors = async () => {
    try {
        const response = await axios.get("/authors");
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        return [];
    }
};

export const updateAuthor = async (id: string, author: IAuthor) => {
    try {
        const response = await axios.put(`/authors/${id}`, author);
        return response.data;
    } catch (error) {
        console.error(`Error updating author with ID ${id}:`, error);
        return null;
    }
};

export const deleteAuthor = async (id: string) => {
    try {
        const response = await axios.delete(`/authors/${id}`);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(`Error deleting author with ID ${id}:`, error);
    }
    return false;
};

export const addAuthor = async (author: IAuthor) => {
    try {
        const response = await axios.post(`/authors`, author);
        return response.data;
    } catch (error) {
        console.error("Error adding author:", error);
        return null;
    }
};

/* Publishers */

export const getPublishers = async () => {
    try {
        const response = await axios.get("/publishers");
        return response.data;
    } catch (error) {
        console.error("Error fetching publishers:", error);
        return [];
    }
};


export const updatePublisher = async (id: string, publisher: IPublisher) => {
    try {
        const response = await axios.put(`/publishers/${id}`, publisher);
        return response.data;
    } catch (error) {
        console.error(`Error updating publisher with ID ${id}:`, error);
        return null;
    }
};

export const deletePublisher = async (id: string) => {
    try {
        const response = await axios.delete(`/publishers/${id}`);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(`Error deleting publisher with ID ${id}:`, error);
    }
    return false;
};

export const addPublisher = async (publisher: IPublisher) => {
    try {
        const response = await axios.post(`/publishers`, publisher);
        return response.data;
    } catch (error) {
        console.error("Error adding publisher:", error);
        return null;
    }
};

/* Members */

export const getMembers = async () => {
    try {
        const response = await axios.get("/members");
        return response.data;
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
};

export const updateMember = async (id: string, member: IMember) => {
    try {
        const response = await axios.put(`/members/${id}`, member);
        return response.data;
    } catch (error) {
        console.error(`Error updating member with ID ${id}:`, error);
        return null;
    }
};

export const deleteMember = async (id: string) => {
    try {
        const response = await axios.delete(`/members/${id}`);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(`Error deleting member with ID ${id}:`, error);
    }
    return false;
};

export const addMember = async (member: IMember) => {
    try {
        const response = await axios.post(`/members`, member);
        return response.data;
    } catch (error) {
        console.error("Error adding member:", error);
        return null;
    }
};

/* Transactions */

export const getTransactions = async () => {
    try {
        const response = await axios.get("/transactions");
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};

export const updateTransaction = async (id: string, transaction: ITransaction) => {
    try {
        const response = await axios.put(`/transactions/${id}`, transaction);
        return response.data;
    } catch (error) {
        console.error(`Error updating transaction with ID ${id}:`, error);
        return null;
    }
};

export const deleteTransaction = async (id: string) => {
    try {
        const response = await axios.delete(`/transactions/${id}`);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(`Error deleting transaction with ID ${id}:`, error);
    }
    return false;
};

export const addTransaction = async (Transaction: ITransaction) => {
    try {
        const response = await axios.post(`/transactions`, Transaction);
        return response.data;
    } catch (error) {
        console.error("Error adding member:", error);
        return null;
    }
};

/* Catalogs */

export const getCatalogs = async () => {
    try {
        const response = await axios.get("/catalogs");
        return response.data;
    } catch (error) {
        console.error("Error fetching catalog:", error);
        return [];
    }
};

export const updateCatalog = async (id: string, catalog: ICatalog) => {
    try {
        const response = await axios.put(`/catalogs/${id}`, catalog);
        return response.data;
    } catch (error) {
        console.error(`Error updating catalog with ID ${id}:`, error);
        return null;
    }
};

export const deleteCatalog = async (id: string) => {
    try {
        const response = await axios.delete(`/catalogs/${id}`);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(`Error deleting catalog with ID ${id}:`, error);
    }
    return false;
};

export const addCatalog = async (catalogs: ICatalog) => {
    try {
        const response = await axios.post(`/catalogs`, catalogs);
        return response.data;
    } catch (error) {
        console.error("Error adding catalog:", error);
        return null;
    }
};
