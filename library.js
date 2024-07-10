var Book = /** @class */ (function () {
    function Book(_a) {
        var title = _a.title, author = _a.author, isbn = _a.isbn, id = _a.id, borrowed = _a.borrowed;
        this.title = title;
        this.author = author;
        this.ISBN = isbn;
        this.id = id;
        this.borrowed = borrowed;
    }
    Book.prototype.isBorrowed = function () {
        return this.borrowed;
    };
    return Book;
}());
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
    User.prototype.peakBook = function (ISBN) {
        return this.borrowedBooks.find(function (book) { return book.ISBN === ISBN; });
    };
    User.prototype.borrowBook = function (book) {
        if (this.borrowedBooks.length >= 3 || book.isBorrowed()) {
            return false;
        }
        this.borrowedBooks.push(book);
        book.borrowed = true;
        return true;
    };
    User.prototype.returnBook = function (ISBN) {
        var borrowedBook = this.borrowedBooks.find(function (book) { return book.ISBN === ISBN; });
        if (borrowedBook) {
            this.borrowedBooks = this.borrowedBooks.filter(function (book) { return book.ISBN !== ISBN; });
            borrowedBook.borrowed = false;
            return true;
        }
        return false;
    };
    return User;
}());
var Library = /** @class */ (function () {
    function Library(books, members) {
        if (books === void 0) { books = []; }
        if (members === void 0) { members = []; }
        this.books = books;
        this.members = members;
    }
    Library.prototype.registerMembers = function (user) {
        this.members.push(user);
    };
    Library.prototype.addNewBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.borrowBook = function (userId, ISBN) {
        var user = this.members.find(function (member) { return member.id === userId; });
        var book = this.books.find(function (b) { return b.ISBN === ISBN; });
        if (user && book && !book.isBorrowed()) {
            return user.borrowBook(book);
        }
        return false;
    };
    Library.prototype.returnBook = function (userId, ISBN) {
        var user = this.members.find(function (member) { return member.id === userId; });
        if (user) {
            return user.returnBook(ISBN);
        }
        return false;
    };
    return Library;
}());
// Example usage:
var MainLibrary = new Library();
var book1 = new Book({ title: "The Lord of the Rings", author: "Tolkien", isbn: "123456789", id: "1", borrowed: false });
var book2 = new Book({ title: "The Hobbit", author: "Tolkien", isbn: "987654321", id: "2", borrowed: false });
var user1 = new User(1, "User 1");
var user2 = new User(2, "User 2");
MainLibrary.addNewBook(book1);
MainLibrary.addNewBook(book2);
MainLibrary.registerMembers(user1);
MainLibrary.registerMembers(user2);
console.log(MainLibrary.borrowBook(1, book1.ISBN)); // true
console.log(MainLibrary.borrowBook(1, book2.ISBN)); // true
console.log(MainLibrary.borrowBook(1, book1.ISBN)); // false (Already borrowed)
console.log(MainLibrary.returnBook(1, book1.ISBN)); // true
console.log(MainLibrary.borrowBook(1, book1.ISBN)); // true (Now can borrow again)
