import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDeleteBookMutation } from '../../../reducers/api';

function BookCard({book}) {
    const [deleteBook] = useDeleteBookMutation(); 

  const handleDeleteClick = async () => {
    try {
      await deleteBook(book.id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

    return (
      <Card>
        <Card.Header>{book.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            Author: {book.author}
          </Card.Text>
          <Card.Text>
            Price: {book.price}
          </Card.Text>
          <Card.Text>
            Publisher: {book.publisher}
          </Card.Text>
          <Card.Text>
            Publish Date: {book.publish_date}
          </Card.Text>
          <Card.Text>
            Genre: {book.genre}
          </Card.Text>
          <Card.Text>
            Description: {book.description}
          </Card.Text>
          <Button className='adminButton' variant="primary">Edit Book</Button>
          <Button  onClick={handleDeleteClick} className='adminButton' variant="primary">Delete Book</Button>
        </Card.Body>
      </Card>
    );
  }

export default BookCard;