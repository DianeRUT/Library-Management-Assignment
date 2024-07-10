class Book {
    title: string;
    author: string;
    ISBN: string;
    id: string;
    borrowed: boolean;
  
    constructor({ title, author, isbn, id, borrowed }: { title: string; author: string; isbn: string; id: string; borrowed: boolean; }) {
      this.title = title;
      this.author = author;
      this.ISBN = isbn;
      this.id = id;
      this.borrowed = borrowed;
    }
  
    isBorrowed(): boolean {
      return this.borrowed;
    }
  }
  
  class User {
    id: number;
    name: string;
    borrowedBooks: Book[];
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
      this.borrowedBooks = [];
    }
  
    peakBook(ISBN: string): Book | undefined {
      return this.borrowedBooks.find((book) => book.ISBN === ISBN);
    }
  
    borrowBook(book: Book): boolean {
      if (this.borrowedBooks.length >= 3 || book.isBorrowed()) {
        return false;
      }
      this.borrowedBooks.push(book);
      book.borrowed = true;
      return true;
    }
  
    returnBook(ISBN: string): boolean {
      const borrowedBook = this.borrowedBooks.find((book) => book.ISBN === ISBN);
      if (borrowedBook) {
        this.borrowedBooks = this.borrowedBooks.filter((book) => book.ISBN !== ISBN);
        borrowedBook.borrowed = false;
        return true;
      }
      return false;
    }
  }
  
  class Library {
    books: Book[];
    members: User[];
  
    constructor(books: Book[] = [], members: User[] = []) {
      this.books = books;
      this.members = members;
    }
  
    registerMembers(user: User) {
      this.members.push(user);
    }
  
    addNewBook(book: Book) {
      this.books.push(book);
    }
  
    borrowBook(userId: number, ISBN: string): boolean {
      const user = this.members.find((member) => member.id === userId);
      const book = this.books.find((b) => b.ISBN === ISBN);
      if (user && book && !book.isBorrowed()) {
        return user.borrowBook(book);
      }
      return false;
    }
  
    returnBook(userId: number, ISBN: string): boolean {
      const user = this.members.find((member) => member.id === userId);
      if (user) {
        return user.returnBook(ISBN);
      }
      return false;
    }
  }
  
  // usage:
  const MainLibrary = new Library();
  const book1 = new Book({ title: "Queen Charlotte", author: "Julia Quinn, Shonda Rhimes", isbn: "0063305089", id: "1", borrowed: false });
  const book2 = new Book({ title: "The American Roommate Experiment", author: "Elena Armas", isbn: "9781668002773", id: "2", borrowed: false });
  
  const user1 = new User(1, "User 1");
  const user2 = new User(2, "User 2");
  
  MainLibrary.addNewBook(book1);
  MainLibrary.addNewBook(book2);
  MainLibrary.registerMembers(user1);
  MainLibrary.registerMembers(user2);
  
  console.log(MainLibrary.borrowBook(1, book1.ISBN)); // true
  console.log(MainLibrary.borrowBook(1, book2.ISBN)); // true
  console.log(MainLibrary.borrowBook(1, book1.ISBN)); // false (Already borrowed)
  console.log(MainLibrary.returnBook(1, book1.ISBN)); // true
  console.log(MainLibrary.borrowBook(1, book1.ISBN)); // true (Now can borrow again)
  