const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.books.createMany({
      data: [
        {
          "title": "The Catcher in the Rye",
          "author": "J.D. Salinger",
          "description": "A classic novel about teenage angst and rebellion.",
          "price": "12.99",
          "publisher": "Little, Brown and Company",
          "publish_date": "July 16, 1951",
          "genre": "Fiction"
        },
        {
          "title": "To Kill a Mockingbird",
          "author": "Harper Lee",
          "description": "A powerful novel addressing racial injustice in the American South.",
          "price": "14.95",
          "publisher": "HarperCollins Publishers",
          "publish_date": "July 11, 1960",
          "genre": "Fiction"
        },
        {
          "title": "1984",
          "author": "George Orwell",
          "description": "A dystopian novel depicting a totalitarian regime's control over society.",
          "price": "10.50",
          "publisher": "Secker & Warburg",
          "publish_date": "June 8, 1949",
          "genre": "Science Fiction"
        },
        {
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "description": "A classic novel exploring the American Dream during the Roaring Twenties.",
          "price": "11.25",
          "publisher": "Charles Scribner's Sons",
          "publish_date": "April 10, 1925",
          "genre": "Fiction"
        },
        {
          "title": "Pride and Prejudice",
          "author": "Jane Austen",
          "description": "A beloved classic novel of manners and romance in 19th-century England.",
          "price": "9.99",
          "publisher": "T. Egerton, Whitehall",
          "publish_date": "January 28, 1813",
          "genre": "Romance"
        },
        {
          "title": "The Hobbit",
          "author": "J.R.R. Tolkien",
          "description": "A fantasy adventure novel featuring hobbits, dwarves, and dragons.",
          "price": "15.99",
          "publisher": "George Allen & Unwin",
          "publish_date": "September 21, 1937",
          "genre": "Fantasy"
        },
        {
          "title": "Harry Potter and the Sorcerer's Stone",
          "author": "J.K. Rowling",
          "description": "The first book in the Harry Potter series, introducing the world of magic.",
          "price": "9.95",
          "publisher": "Scholastic",
          "publish_date": "June 26, 1997",
          "genre": "Fantasy"
        },
        {
          "title": "The Da Vinci Code",
          "author": "Dan Brown",
          "description": "A thriller involving art, history, and religious mysteries.",
          "price": "13.75",
          "publisher": "Doubleday",
          "publish_date": "March 18, 2003",
          "genre": "Thriller"
        },
        {
          "title": "The Shining",
          "author": "Stephen King",
          "description": "A horror novel set in a haunted hotel with a troubled caretaker.",
          "price": "11.99",
          "publisher": "Doubleday",
          "publish_date": "January 28, 1977",
          "genre": "Horror"
        },
        {
          "title": "The Girl on the Train",
          "author": "Paula Hawkins",
          "description": "A psychological thriller involving unreliable narrators and hidden secrets.",
          "price": "12.50",
          "publisher": "Riverhead Books",
          "publish_date": "January 13, 2015",
          "genre": "Mystery"
        },
        {
          "title": "The Hunger Games",
          "author": "Suzanne Collins",
          "description": "A dystopian novel featuring a young heroine in a fight for survival.",
          "price": "10.99",
          "publisher": "Scholastic",
          "publish_date": "September 14, 2008",
          "genre": "Science Fiction"
        },
        {
          "title": "The Road",
          "author": "Cormac McCarthy",
          "description": "A post-apocalyptic novel following a father and son's journey to survive.",
          "price": "12.25",
          "publisher": "Alfred A. Knopf",
          "publish_date": "September 26, 2006",
          "genre": "Dystopian"
        },
        {
          "title": "The Alchemist",
          "author": "Paulo Coelho",
          "description": "A philosophical novel about a shepherd's journey to discover his personal legend.",
          "price": "11.99",
          "publisher": "HarperOne",
          "publish_date": "1988",
          "genre": "Philosophy"
        },
        {
          "title": "Brave New World",
          "author": "Aldous Huxley",
          "description": "A dystopian novel exploring a future society driven by pleasure and conformity.",
          "price": "10.95",
          "publisher": "Chatto & Windus",
          "publish_date": "1932",
          "genre": "Science Fiction"
        },
        {
          "title": "The Lord of the Rings",
          "author": "J.R.R. Tolkien",
          "description": "An epic fantasy trilogy set in the world of Middle-earth.",
          "price": "29.99",
          "publisher": "George Allen & Unwin",
          "publish_date": "1954-1955",
          "genre": "Fantasy"
        },
        {
          "title": "The Road Not Taken: Finding America in the Poem Everyone Loves and Almost Everyone Gets Wrong",
          "author": "David Orr",
          "description": "A literary analysis of Robert Frost's famous poem.",
          "price": "17.99",
          "publisher": "Penguin Press",
          "publish_date": "August 15, 2017",
          "genre": "Literary Criticism"
        },
        {
          "title": "The Martian",
          "author": "Andy Weir",
          "description": "A science fiction novel about an astronaut stranded on Mars.",
          "price": "12.99",
          "publisher": "Crown Publishing Group",
          "publish_date": "February 11, 2014",
          "genre": "Science Fiction"
        },
        {
          "title": "The Book Thief",
          "author": "Markus Zusak",
          "description": "A novel set in Nazi Germany narrated by Death, focusing on a young girl's love of books.",
          "price": "11.50",
          "publisher": "Knopf",
          "publish_date": "March 14, 2006",
          "genre": "Historical Fiction"
        },
        {
          "title": "The Odyssey",
          "author": "Homer",
          "description": "An ancient Greek epic poem detailing the adventures of Odysseus.",
          "price": "8.95",
          "publisher": "Various",
          "publish_date": "8th century BCE",
          "genre": "Epic Poetry"
        },
        {
          "title": "The Road Less Traveled: A New Psychology of Love, Traditional Values, and Spiritual Growth",
          "author": "M. Scott Peck",
          "description": "A self-help book exploring personal growth and spiritual development.",
          "price": "13.99",
          "publisher": "Simon & Schuster",
          "publish_date": "1978",
          "genre": "Self-Help"
        },
        {
          "title": "The Brothers Karamazov",
          "author": "Fyodor Dostoevsky",
          "description": "A philosophical novel exploring the moral and spiritual dilemmas of three brothers.",
          "price": "16.99",
          "publisher": "The Russian Messenger",
          "publish_date": "1880",
          "genre": "Philosophical Fiction"
        },
        {
          "title": "The Girl with the Dragon Tattoo",
          "author": "Stieg Larsson",
          "description": "A mystery thriller featuring a journalist and a hacker investigating a decades-old disappearance.",
          "price": "14.25",
          "publisher": "Norstedts Förlag",
          "publish_date": "2005",
          "genre": "Mystery"
        },
        {
          "title": "The Road to Serfdom",
          "author": "Friedrich Hayek",
          "description": "A classic work of political philosophy advocating for individualism and free-market capitalism.",
          "price": "9.95",
          "publisher": "Routledge",
          "publish_date": "1944",
          "genre": "Political Philosophy"
        },
        {
          "title": "The Wind-Up Bird Chronicle",
          "author": "Haruki Murakami",
          "description": "A surreal novel about a man's search for his missing wife and cat.",
          "price": "12.99",
          "publisher": "Kodansha",
          "publish_date": "1994-1995",
          "genre": "Surreal Fiction"
        },
        {
          "title": "The Road to Character",
          "author": "David Brooks",
          "description": "A book exploring the concept of character development and moral values.",
          "price": "14.50",
          "publisher": "Random House",
          "publish_date": "April 14, 2015",
          "genre": "Self-Help"
        },
        {
          "title": "The Stand",
          "author": "Stephen King",
          "description": "An apocalyptic horror novel about the survivors of a deadly virus.",
          "price": "15.75",
          "publisher": "Doubleday",
          "publish_date": "October 3, 1978",
          "genre": "Horror"
        },
        {
          "title": "The Art of War",
          "author": "Sun Tzu",
          "description": "A classic Chinese military treatise on strategy and tactics.",
          "price": "7.95",
          "publisher": "Various",
          "publish_date": "5th century BCE",
          "genre": "Military Strategy"
        },
        {
          "title": "The Stranger",
          "author": "Albert Camus",
          "description": "A philosophical novel exploring the absurdity of human existence.",
          "price": "10.50",
          "publisher": "Éditions Gallimard",
          "publish_date": "1942",
          "genre": "Philosophical Fiction"
        },
        {
          "title": "The Road to Oz",
          "author": "L. Frank Baum",
          "description": "A children's fantasy novel following Dorothy's adventures in the land of Oz.",
          "price": "6.99",
          "publisher": "Reilly & Britton",
          "publish_date": "1909",
          "genre": "Children's Fantasy"
        },
        {
          "title": "The Power of Habit: Why We Do What We Do in Life and Business",
          "author": "Charles Duhigg",
          "description": "A book on the science of habit formation and its impact on individuals and organizations.",
          "price": "11.99",
          "publisher": "Random House",
          "publish_date": "February 28, 2012",
          "genre": "Psychology"
        },
        {
          "title": "The Metamorphosis",
          "author": "Franz Kafka",
          "description": "A surreal novella about a man who wakes up transformed into an insect.",
          "price": "8.25",
          "publisher": "Kurt Wolff Verlag",
          "publish_date": "1915",
          "genre": "Surreal Fiction"
        },
        {
          "title": "The Hitchhiker's Guide to the Galaxy",
          "author": "Douglas Adams",
          "description": "A comedic science fiction series following the adventures of Arthur Dent.",
          "price": "9.95",
          "publisher": "Pan Books",
          "publish_date": "1979",
          "genre": "Science Fiction"
        },
        {
          "title": "The Innovator's Dilemma: When New Technologies Cause Great Firms to Fail",
          "author": "Clayton Christensen",
          "description": "A business book exploring the challenges faced by established companies in the face of disruptive innovation.",
          "price": "16.50",
          "publisher": "Harvard Business Review Press",
          "publish_date": "1997",
          "genre": "Business"
        },
        {
          "title": "The Picture of Dorian Gray",
          "author": "Oscar Wilde",
          "description": "A novel about a man whose portrait ages while he remains young and beautiful.",
          "price": "7.99",
          "publisher": "Ward, Lock & Co.",
          "publish_date": "1890",
          "genre": "Gothic Fiction"
        },
        {
          "title": "The Hound of the Baskervilles",
          "author": "Arthur Conan Doyle",
          "description": "A Sherlock Holmes mystery novel involving a legendary ghostly hound.",
          "price": "8.75",
          "publisher": "George Newnes",
          "publish_date": "1902",
          "genre": "Mystery"
        },
        {
          "title": "The Devil Wears Prada",
          "author": "Lauren Weisberger",
          "description": "A novel about the glamorous yet demanding world of fashion publishing.",
          "price": "9.99",
          "publisher": "Doubleday",
          "publish_date": "April 13, 2003",
          "genre": "Chick Lit"
        },
        {
          "title": "The Road Back to You: An Enneagram Journey to Self-Discovery",
          "author": "Ian Morgan Cron and Suzanne Stabile",
          "description": "A book exploring the Enneagram personality system for self-discovery and personal growth.",
          "price": "14.99",
          "publisher": "IVP Books",
          "publish_date": "October 4, 2016",
          "genre": "Self-Help"
        },
        {
          "title": "The War of the Worlds",
          "author": "H.G. Wells",
          "description": "A science fiction novel about an invasion of Earth by Martians.",
          "price": "7.95",
          "publisher": "William Heinemann",
          "publish_date": "1898",
          "genre": "Science Fiction"
        },
        {
          "title": "The Art of Happiness",
          "author": "Dalai Lama and Howard Cutler",
          "description": "A book exploring the Dalai Lama's philosophy on happiness and well-being.",
          "price": "11.25",
          "publisher": "Riverhead Books",
          "publish_date": "1998",
          "genre": "Philosophy"
        },
        {
          "title": "The Road to Woodstock",
          "author": "Michael Wadleigh",
          "description": "A book documenting the legendary Woodstock music festival of 1969.",
          "price": "14.99",
          "publisher": "Harper",
          "publish_date": "July 14, 2009",
          "genre": "Music History"
        },
        {
          "title": "The Girl Who Played with Fire",
          "author": "Stieg Larsson",
          "description": "A crime thriller featuring Lisbeth Salander and journalist Mikael Blomkvist.",
          "price": "14.75",
          "publisher": "Norstedts Förlag",
          "publish_date": "2006",
          "genre": "Thriller"
        },
        {
          "title": "The Selfish Gene",
          "author": "Richard Dawkins",
          "description": "A book exploring the concept of evolution and the role of genes in shaping behavior.",
          "price": "13.50",
          "publisher": "Oxford University Press",
          "publish_date": "1976",
          "genre": "Science"
        },
        {
          "title": "The Silmarillion",
          "author": "J.R.R. Tolkien",
          "description": "A collection of mythopoeic works detailing the history of Middle-earth.",
          "price": "18.99",
          "publisher": "George Allen & Unwin",
          "publish_date": "1977",
          "genre": "Fantasy"
        }
      ]
      ,
    });
  }
  
  main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });


    