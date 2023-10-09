import React from "react";
import { useAddBookMutation } from "../../../reducers/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publish_date, setPublishDate] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [addBook] = useAddBookMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !price) {
      alert("Please fill in the mandatory fields.");
      return;
    }

    try {
      const response = await addBook({
        title,
        author,
        price: Number(price),
        publisher,
        publish_date,
        genre,
        description,
      });

      if (response.data) {
        console.log("Book added successfully:", response.data);
        onBookAdded();
        // You can reset form or navigate user to some other page or display success message
        // Example: resetting the form
        setTitle("");
        setAuthor("");
        setPrice("");
        setPublisher("");
        setPublishDate("");
        setGenre("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPublisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPublish_date">
        <Form.Label>Publish Date</Form.Label>
        <Form.Control
          type="text"
          value={publish_date}
          onChange={(e) => setPublishDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default AddBookForm;
