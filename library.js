let library = [];

function Book(title, author, pages, read, cover = "notfound.png") {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read,
	this.cover = cover
	}

function addBookToLibrary() {
	// Display a popup menu to add a book
	library.push(new Book("Wow, a book!", "Jobel", "42069", false));
	updateBookTiles();
}

function updateBookTiles() {
	// If we have no books, set it to the empty page
	if (library.length == 0) {
		document.getElementById("card-container").style.display = "none";
		document.getElementById("empty").style.display = "flex";
		return;
	}
	
	document.getElementById("card-container").style.display = "flex";
	document.getElementById("empty").style.display = "none";

	let container = document.getElementById("card-container");
	container.textContent = "";
	for (let i = 0; i < library.length; i++) {
		container.appendChild(createCardForBook(library[i], i));
	}
}

function createCardForBook(book, bookId) {
	if ('content' in document.createElement('template')){
		let template = document.querySelector('#book-card-template');
		let card = template.content.cloneNode(true);
		card.querySelector('.book-card').setAttribute('data-bookId', bookId);
		return card;
	}
	else {
		// IE specific implementation for templates
		return document.createElement('p');
	}
}

function demo() {
}

// Setup
document.querySelector('#add-book-button').addEventListener('click', addBookToLibrary);

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
updateBookTiles();