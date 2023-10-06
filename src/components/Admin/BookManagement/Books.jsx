import { useState } from "react";
import {
  useGetBooksQuery,
  useEditBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} from "../../../reducers/api";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //fetch books from api
    //set them with setBooks()
  }, []);

  return (
    <div>
      <SearchBar /* props and handlers */ />
      {/* <AddbookForm /> */}
      <BookList books={books} />
    </div>
  );
}
