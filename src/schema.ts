import { dataSources } from './dataSources';
import { makeExecutableSchema } from "@graphql-tools/schema"
import { logger } from 'log'

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }
  
  type Book {
    id: ID!
    name: String!
    publisher: Publisher!
    authors: [Author!]!
  }
  
  type Publisher {
    id: ID!
    name: String!
    books: [Book!]!
  }
  
  type Query {
    authors: [Author!]!
    author(id: ID!): Author!
    books: [Book!]!
    book(id: ID!): Book!
    publishers: [Publisher!]!
    publisher(id: ID!): Publisher!
  }
`;

const resolvers = {
    Query: {
        authors() {
            return dataSources.bookService.getAuthors();
        },

        author(parent, args) {
            return dataSources.bookService.getAuthor(args.id);
        },
        books() {
            return dataSources.bookService.getBooks();
        },
        book(parent, args) {
            return dataSources.bookService.getBook(args.id);
        },
        publishers() {
            return dataSources.bookService.getPublishers();
        },
        publisher(parent, args) {
            return dataSources.bookService.getPublisher(args.id);
        }
    },

    Author: {
        books(parent) {
            return dataSources.bookService.getAuthorBooks(parent.id);
        }
    },
    Book: {
        publisher(parent) {
            return dataSources.bookService.getBookPublisher(parent.id);
        },
        authors(parent) {
            return dataSources.bookService.getBookAuthors(parent.id);
        }
    },
    Publisher: {
        books(parent) {
            return dataSources.bookService.getPublisherBooks(parent.id);
        }
    }
};

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});