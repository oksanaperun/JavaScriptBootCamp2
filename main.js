/**
 * Created by Oksana on 02.03.2015.
 */
var book1 = {
    title: "War and Peace",
    author: {
        name: "Lev",
        surname: "Tolstoy"
    },
    pageCount: 2000,
    isbn: 111,
    isForChildren: false
};

var book2 = {
    title: "Star Wars",
    author: {
        name: "",
        surname: ""
    },
    pageCount: 1000,
    isbn: 222,
    isForChildren: false
};

var catalog = [book1, book2];

var ADD_BOOK = "1";
var UPDATE_BOOK = "2";
var DELETE_BOOK = "3";
var PRINT_CATALOG = "4";
var EXIT = "5";

function getAnswerOfQuestion(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;
    stdin.resume();
    stdin.setEncoding('utf8');
    stdout.write(question + "? ");
    stdin.once('data', function (data) {
        data = data.toString().trim();
        callback(data);
    })
}

function searchBookPosition(text) {
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
    return searchResults;
}

function addEmptyBook() {
    var book = {
        title: " ",
        pageCount: 0,
        isbn: 0
    };
    catalog.push(book);
}

function addNewBook() {
    console.log("-----------------------");
    console.log("For adding a book, please, answer next questions:");
    console.log("");
    getAnswerOfQuestion("What is the title of the book", function (inputTitle) {
        //check correct input int
        getAnswerOfQuestion("How many pages are in the book", function (inputPageCount) {
            //check unique isbn
            getAnswerOfQuestion("What is the isbn of the book", function (inputIsbn) {
                addEmptyBook();
                updateBookInfoByPosition(catalog.length - 1, "title", inputTitle);
                updateBookInfoByPosition(catalog.length - 1, "pageCount", inputPageCount);
                updateBookInfoByPosition(catalog.length - 1, "isbn", inputIsbn);
                console.log("New book is added with title " + inputTitle + ", isbn " + inputIsbn + " and " +
                    inputPageCount + " pages.");
                catalogOptions();
            });
        });
    });
}

function updateBookInfoByPosition(position, property, value) {
    switch (property) {
        case "title":
            catalog[position].title = value;
            break;
        case "pageCount":
            catalog[position].pageCount = value;
            break;
        case "isbn":
            catalog[position].isbn = value;
            break;
    }
}

function deleteBook() {
    console.log("-----------------------");
    getAnswerOfQuestion("What is (fragment of) title/author of the book to delete", function (text) {
        var searchResults = searchBookPosition(text);
        if (searchResults.length > 0) {
            console.log("Next books will be deleted:");
            for (var i = 0; i < searchResults.length; i++)
                for (var j = 0; j < catalog.length; j++) {
                    if (searchResults[i] == j) {
                        console.log((i + 1) + ". " + catalog[j].title + ", isbn " + catalog[j].isbn)
                    }
                }
            getAnswerOfQuestion("Continue (yes/no)?", function (answer) {
                if (answer == "yes") {
                    for (var i = 0; i < searchResults.length; i++)
                        for (var j = 0; j < catalog.length; j++) {
                            if (searchResults[i] == j) {
                                catalog.splice(j, 1);
                            }
                        }
                    console.log("Books are deleted.");
                    catalogOptions();
                } else if (answer == "no") {
                    console.log("Ok. We're doing nothing.")
                    catalogOptions();
                } else catalogOptions();
            })
        }
        else {
            console.log("There is nothing to delete with entered fragment of the text.");
            catalogOptions();
        }
    });
}

function printCatalog() {
    console.log("-----------------------");
    for (var i = 0; i < catalog.length; i++) {
        console.log((i + 1) + ". " + catalog[i].title + ", isbn " + catalog[i].isbn + ", " + catalog[i].pageCount + " pages.");
        if (catalog[i].author) {
            console.log("Author " + catalog[i].author.name + " " + catalog[i].author.surname);
        }
    }
    catalogOptions();
}

function printOptions() {
    console.log("");
    console.log("---Available options---");
    console.log("1. Add new book");
    console.log("2. Update book info");
    console.log("3. Delete book");
    console.log("4. Print catalog");
    console.log("5. Exit");
    console.log("-----------------------");
}

function catalogOptions() {
    printOptions();
    getAnswerOfQuestion("What do you like to do (enter number of option or 'q' to exit)", function (option) {
        if (option == "q") {
            process.exit();
        }
        switch (option) {
            case ADD_BOOK:
                addNewBook();
                break;
            case DELETE_BOOK:
                deleteBook();
                break;
            case PRINT_CATALOG:
                printCatalog();
                break;
            case EXIT:
                process.exit();
            default:
                console.log("You entered incorrect number of the option.");
        }
    });
}

console.log("*****BOOKS CATALOG*****");
catalogOptions();
