import { useState } from "react";
import {
  useGetBooksQuery,
  useEditBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} from "../../../reducers/api";

function Books() {
  const { data, isLoading } = useGetBooksQuery();
  console.log("book", data);

  return (
    <div>
      {data.map((i) => (
        <div>
          <h2>Title: {i.title}</h2>
          <h2> by: {i.author}</h2>
        </div>
      ))}
    </div>
  );
}
export default Books;
