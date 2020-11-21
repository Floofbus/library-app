let library = [];

function Book(title, author, pages, read, cover = "", category = "") {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read,
	this.cover = cover,
	this.category = category
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

		// Set up event listeners
		let editButton = card.querySelector('.book-card-edit');
		editButton.setAttribute('data-bookId', bookId);
		editButton.addEventListener('click', editBook);

		let removeButton = card.querySelector('.book-card-remove');
		removeButton.setAttribute('data-bookId', bookId);
		removeButton.addEventListener('click', removeBook);

		let readButton = card.querySelector('.book-card-read')
		readButton.setAttribute('data-bookId', bookId);
		readButton.addEventListener('click', toggleBookRead);

		// Set book info
		if (book.cover == "") {
			card.querySelector('.book-card').style['background'] = `url("pages-2-xxl.png"), tan`;
			card.querySelector('.book-card').style['background-size'] = "80%";
			card.querySelector('.book-card').style['background-repeat'] = "no-repeat";
			card.querySelector('.book-card').style['background-position'] = "center";
		}
		else {
			card.querySelector('.book-card').style['background'] = `url(${book.cover})`;
			card.querySelector('.book-card').style['background-size'] = "100%";
		}
		card.querySelector('.book-card-title').textContent = book.title;
		card.querySelector('.book-card-author').textContent = book.author;
		card.querySelector('.book-card-pagenumber').textContent = `${book.pages} Pages`;

		card.querySelector('.book-card-read p').textContent = (book.read) ? "Complete" : "Mark as read";
		if (book.read) card.querySelector('.book-card-read').classList.toggle('book-card-read-complete');



		return card;
	}
	else {
		// IE specific implementation for templates
		return document.createElement('p');
	}
}

function editBook(event) {
	alert(event.target.getAttribute('data-bookId'));
}

function removeBook(event) {
	library.splice(event.target.getAttribute('data-bookId'), 1);
	updateBookTiles();
}

function toggleBookRead(event) {
	library[event.currentTarget.getAttribute('data-bookId')].read = !library[event.currentTarget.getAttribute('data-bookId')].read;
	updateBookTiles();
}


function demo() {
	library.push(new Book("Flowers for Algernon", "Daniel Keyes", 311, true,
						  "https://images-na.ssl-images-amazon.com/images/I/41gvkhScVBL.jpg", "Sci-fi"));
	library.push(new Book("Digital Design", "Morris Mano", 516, false,
						  "https://images-na.ssl-images-amazon.com/images/I/51RX57XZ83L._SX360_BO1,204,203,200_.jpg", "Textbook"));
	library.push(new Book("Tonal Harmony with an Introduction to Twentieth-Century Music", "Stefan Kostka, Dorothy Payne", 736, false,
						  "https://images-na.ssl-images-amazon.com/images/I/41b--In4X3L.jpg", "Textbook"));
	library.push(new Book("The Complete Idiot's Guide to Music Composition", "Michael Miller", 264, false,
						  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386924417l/12510.jpg", "Textbook"));
	library.push(new Book("C++ Plus Data Structures", "Nell Dale", 816, false,
						  "", "Textbook"));
}

// Setup
document.querySelector('#add-book-button').addEventListener('click', addBookToLibrary);

demo();
updateBookTiles();