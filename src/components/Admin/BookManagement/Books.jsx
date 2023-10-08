import { useState } from "react";
import {
  useGetBooksQuery,
  useEditBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} from "../../../reducers/api";
import BookCard from "./BooksCard";
import Button from 'react-bootstrap/Button';

function Books() {
  const { data, isLoading } = useGetBooksQuery();
  console.log("book", data);

  return (
<div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data.length === 0 ? (
        <h1>No Books Found</h1>
      ) : (
        data.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      )}
      <Button variant="primary">Add New Book</Button>
    </div>
  );
}
export default Books;
