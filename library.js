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
		let card = document.createElement('div');
		card.classList.add("book-card");
		card.textContent = `${library[i].title} by ${library[i].author}\nIt has ${library[i].pages} and has ${library[i].read ? "been read." : "not been read."}`;
		container.appendChild(card);
	}
}

function createBookCard(book) {
	let card = document.createElement('div')
	card.classList.add("book-card");

}

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();