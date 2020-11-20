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
}

function updateBookTiles() {
	let container = document.getElementById("card-container");
	container.textContent = "";
	for (let i = 0; i < library.length; i++) {
		container.appendChild(createCardForBook(library[i]));
	}
}

function createCardForBook(book) {
	if ('content' in document.createElement('template')){
		let template = document.querySelector('#book-card-template');
		let card = template.content.cloneNode(true);
		return card;
	}
	else {
		// IE specific implementation for templates
		return document.createElement('p');
	}
}

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
updateBookTiles();