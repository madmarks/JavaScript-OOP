/* Task Description */
/* 
*	Create a module for working with books
	*	The module must provide the following functionalities:
		*	Add a new book to category
			*	Each book has unique title, author and ISBN
			*	It must return the newly created book with assigned ID
			*	If the category is missing, it must be automatically created
		*	List all books
			*	Return an array of books 
			*	Books are sorted by ID
			*	This can be done by author, by category or all
				*	They are provided by an options object {category: ...} or {author: ...}			
		*	List all categories
			*	Return an array of categories
			*	Categories are sorted by ID
	*	Each book/catagory has a unique identifier (ID) that is a number greater than 1
		*	When adding a book/category, the ID is generated automatically
	*	Add validation everywhere, where possible
		*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
		*	Author is any non-empty string
		*	Unique params are Book title and Book ISBN
		*	Book ISBN is an unique code that contains either 10 or 13 digits
		*	If something is not valid - throw Error
*/
function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        // Polyfill
        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === "number" &&
                   isFinite(value) &&
                   Math.floor(value) === value;
        };

        function listBooks() {

            var option,
                optionValue;

            if (arguments.length) {

                if (arguments[0].category) {
                    option = 'category';
                    optionValue = arguments[0].category;

                } else if (arguments[0].author) {
                    option = 'author';
                    optionValue = arguments[0].author;
                }

                return books.filter(function (item) {
                    return item[option] === optionValue;
                });
            }

            return books.sort(function (x, y) {
                return x.ID - y.ID;
            });
        }

        function addBook(book) {
            function isNotUnique(property, value) {
                return books.some(function (item) {
                    return item[property] === value;
                });
            }

            if (!arguments.length || !book) {
                throw new Error;
            }

            if (!book.category) {
                book.category = categories.length + 1;

                if (isNotUnique('category', book.category)) {
                    throw new Error('Category with this name alredy exists!');
                }
            }

            if (book.title.length < 2 || book.title.length > 100 || isNotUnique('title', book.title)) {
                throw new Error('Title length MUST be between 2 and 100 characters and MUST be Unique!');
            }

            if (Number.isInteger(book.isbn) || ((book.isbn.length !== 10 && book.isbn.length !== 13)) || isNotUnique('isbn', book.isbn)) {
                throw new Error('ISBN length MUST be either 10 or 13 digits and MUST be Unique!');
            }

            if (!book.author) {
                throw new Error;
            }

            book.ID = books.length + 1;

            books.push(book);
            return book;
        }

        function listCategories() {

            books.forEach(function (item) {
                if(!categories.some(function(el){
                    return el === item.category;
                })){
                    categories.push(item.category);
                }
            })

            return categories.sort(function(x, y){
                return x - y;
            });
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}
module.exports = solve;
