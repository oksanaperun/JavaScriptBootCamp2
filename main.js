/**
 * Created by Oksana on 02.03.2015.
 */
var book1 = {
    title: "War and Peace",
    pageCount: 2000,
    author: {
        name: "Lev",
        surname: "Tolstoy"
    },
    isForChildren: false
};

var book2 = {
    title: "Star Wars",
    pageCount: 1000,
    author: {
        name: "",
        surname: ""
    },
    isForChildren: false
};

var catalog = [book1, book2];

var ADD_BOOK = "1";
var UPDATE_BOOK = "2";
var DELETE_BOOK = "3";
var SEARCH_BOOK = "4";
var PRINT_CATALOG = "5";
var EXIT = "6";

var TITLE_FIELD = "1";
var PAGE_COUNT_FIELD = "2";
var AUTHOR_NAME_FIELD = "3";
var AUTHOR_SURNAME_FIELD = "4";
var IS_FOR_CHILDREN_FIELD = "5";

function getAnswerOfQuestion(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;
    stdin.resume();
    stdin.setEncoding('utf8');
    stdout.write(question);
    stdin.once('data', function (data) {
        data = data.toString().trim();
        callback(data);
    })
}

function printBook(position) {
    console.log(catalog[position].title + ", " + catalog[position].pageCount + " pages.");
    if (catalog[position].author) {
        if (catalog[position].author.name != "" || catalog[position].author.surname != "")
            console.log("Author " + catalog[position].author.name + " " + catalog[position].author.surname);
    }
    if (catalog[position].isForChildren) {
        console.log("This book belongs to the children's literature.");
    }
}

function searchBookResults(text) {
    var searchResults = [];
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].title.toLowerCase().indexOf(text.toLowerCase()) > -1) {
            searchResults.push(i);
        }
        else if (catalog[i].author) {
            if (catalog[i].author.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                catalog[i].author.surname.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                searchResults.push(i);
            }
        }
    }
    if (searchResults.length > 0) {
        console.log("Search results:");
        for (var i = 0; i < searchResults.length; i++)
            for (var j = 0; j < catalog.length; j++) {
                if (searchResults[i] == j) {
                    console.log(i + 1);
                    printBook(i);
                }
            }
    }
    else {
        console.log("No books are found.");
    }
    return searchResults;
}

function searchBook() {
    console.log("-----------------------");
    getAnswerOfQuestion("What is (fragment of) title/author of the book to search? ", function (text) {
        searchBookResults(text);
        catalogOptions();
    });
}

function addEmptyBook() {
    var book = {
        title: " ",
        pageCount: 0,
        author: {
            name: "",
            surname: ""
        },
        isForChildren: false
    };
    catalog.push(book);
}

function updateBookInfoByPosition(position, property, value) {
    switch (property) {
        case TITLE_FIELD:
            catalog[position].title = value;
            break;
        case PAGE_COUNT_FIELD:
            catalog[position].pageCount = value;
            break;
        case AUTHOR_NAME_FIELD:
            catalog[position].author.name = value;
            break;
        case AUTHOR_SURNAME_FIELD:
            catalog[position].author.surname = value;
            break;
        case IS_FOR_CHILDREN_FIELD:
            catalog[position].isForChildren = value;
            break;
        default :
            console.log("Name of the field is undefined.");
    }
}

function addNewBook() {
    console.log("-----------------------");
    console.log("For adding a book, please, answer next questions:");
    console.log("");
    getAnswerOfQuestion("What is the title of the book? ", function (inputTitle) {
        // implement: check correct int input
        getAnswerOfQuestion("How many pages are in the book (enter integer value)? ", function (inputPageCount) {
            getAnswerOfQuestion("What is the author's name? ", function (inputAuthorName) {
                getAnswerOfQuestion("What is the author's surname? ", function (inputAuthorSurname) {
                    // implement: check correct boolean input
                    // now value false only if entered nothing
                    getAnswerOfQuestion("Is the book for children (true/false)? ", function (inputIsForChildren) {
                        addEmptyBook();
                        updateBookInfoByPosition(catalog.length - 1, TITLE_FIELD, inputTitle);
                        updateBookInfoByPosition(catalog.length - 1, PAGE_COUNT_FIELD, inputPageCount);
                        updateBookInfoByPosition(catalog.length - 1, AUTHOR_NAME_FIELD, inputAuthorName);
                        updateBookInfoByPosition(catalog.length - 1, AUTHOR_SURNAME_FIELD, inputAuthorSurname);
                        updateBookInfoByPosition(catalog.length - 1, IS_FOR_CHILDREN_FIELD, inputIsForChildren);
                        console.log("New book is added:");
                        printBook(catalog.length - 1);
                        catalogOptions();
                    });
                });
            });
        });
    });
}

function printListOfFields() {
    console.log("---Available fields---");
    console.log(TITLE_FIELD + ". Title");
    console.log(PAGE_COUNT_FIELD + ". Page count");
    console.log(AUTHOR_NAME_FIELD + ". Author's name");
    console.log(AUTHOR_SURNAME_FIELD + ". Author's surname");
    console.log(IS_FOR_CHILDREN_FIELD + ". Is for children");
    console.log("-----------------------");
}

function updateBook() {
    console.log("-----------------------");
    getAnswerOfQuestion("What is (fragment of) title/author of the book to update? ", function (text) {
        var searchResults = searchBookResults(text);
        //implement: check correct int input
        getAnswerOfQuestion("Enter position of the book from the list above to update. ", function (position) {
            if (position > searchResults.length || position < 1) {
                console.log("There is no such position.");
                // implement: return to input of the position
                catalogOptions();
            } else {
                console.log("Now you should choose field to update.")
                printListOfFields();
                getAnswerOfQuestion("Enter number of field to update. ", function (field) {
                    // implement: check entered value according to the field
                    getAnswerOfQuestion("Enter new value of this field. ", function (value) {
                        updateBookInfoByPosition(position - 1, field, value);
                        console.log("Field is updated.");
                        // implement: return to update other field or to main menu
                        catalogOptions();
                    });
                });
            }
        });
    });
}

function deleteBook() {
    console.log("-----------------------");
    getAnswerOfQuestion("What is (fragment of) title/author of the book to delete? ", function (text) {
        var searchResults = searchBookResults(text);
        if (searchResults.length > 0) {
            getAnswerOfQuestion("Delete book(s) from the list above (yes/no)? ", function (answer) {
                if (answer == "yes") {
                    for (var i = searchResults.length - 1; i >= 0; i--)
                        for (var j = catalog.length - 1; j >= 0; j--) {
                            if (searchResults[i] == j) {
                                catalog.splice(j, 1);
                            }
                        }
                    console.log("Books are deleted.");
                    catalogOptions();
                } else if (answer == "no") {
                    console.log("Ok. We did nothing.");
                    catalogOptions();
                } else catalogOptions();
            });
        } else catalogOptions();
    });
}

function printCatalog() {
    console.log("-----------------------");
    console.log("-----List of Books-----");
    for (var i = 0; i < catalog.length; i++) {
        console.log(i + 1);
        printBook(i);
    }
    catalogOptions();
}

function printOptions() {
    console.log("-----------------------");
    console.log("---Available options---");
    console.log(ADD_BOOK + ". Add new book");
    console.log(UPDATE_BOOK + ". Update book info");
    console.log(DELETE_BOOK + ". Delete book(s)");
    console.log(SEARCH_BOOK + ". Search book(s)");
    console.log(PRINT_CATALOG + ". Print catalog");
    console.log(EXIT + ". Exit");
    console.log("-----------------------");
}

function validateOptions(option) {
    switch (option) {
        case ADD_BOOK:
            addNewBook();
            break;
        case UPDATE_BOOK:
            updateBook();
            break;
        case DELETE_BOOK:
            deleteBook();
            break;
        case SEARCH_BOOK:
            searchBook();
            break;
        case PRINT_CATALOG:
            if (catalog.length > 0) {
                printCatalog();
            } else console.log("Books catalog is empty.");
            break;
        case EXIT:
            process.exit();
        default:
            console.log("You've entered incorrect number of the option!");
            getAnswerOfQuestion("What do you like to do (enter number of option)? ", function (option) {
                validateOptions(option);
            });
    }
}

function catalogOptions() {
    printOptions();
    getAnswerOfQuestion("What do you like to do (enter number of option)? ", function (option) {
        validateOptions(option);
    });
}

console.log("*****BOOKS CATALOG*****");
catalogOptions();
