let library = JSON.parse(localStorage.getItem('library') || "[]");
let formOpen = false;

function Book(title, author, pages, read, cover = "") {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read,
	this.cover = cover
	}

function addBookToLibrary() {
	// Display a popup menu to add a book
	openBookForm();
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
	// Store updated info
	localStorage.setItem('library', JSON.stringify(library));
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
			card.querySelector('.book-card').style['background'] = `url(${book.cover}), gray`;
			card.querySelector('.book-card').style['background-size'] = "100%";
			card.querySelector('.book-card').style['background-repeat'] = "no-repeat";


		}
		card.querySelector('.book-card-title').textContent = book.title;
		card.querySelector('.book-card-author').textContent = book.author;
		card.querySelector('.book-card-pagenumber').textContent = `${book.pages} Pages`;

		card.querySelector('.book-card-read p').textContent = (book.read) ? "Complete" : "Mark as read";
		if (book.read) card.querySelector('.book-card-read').classList.toggle('book-card-read-complete');

		// Finalize with a bookId for later querying
		card.querySelector('.book-card').setAttribute('data-bookId', bookId);

		return card;
	}
	else {
		// IE specific implementation for templates
		document.createElement('p');
	}
}

function editBook(event) {
	openBookForm(event.currentTarget.getAttribute('data-bookId'));
}

function removeBook(event) {
	if (confirm("Are you sure you want to remove " + 
				library[event.target.getAttribute('data-bookId')].title + 
				" from your library?")) {
		library.splice(event.target.getAttribute('data-bookId'), 1);
		updateBookTiles();
	}
}

function toggleBookRead(event) {
	let book = library[event.currentTarget.getAttribute('data-bookId')];
	book.read = !book.read;
	event.currentTarget.classList.toggle('book-card-read-complete');
	if (book.read) {
		event.currentTarget.querySelector('p').textContent = "Complete";
	}
	else {
		event.currentTarget.querySelector('p').textContent = "Mark as read";
	}
	// Store updated info
	localStorage.setItem('library', JSON.stringify(library));
}

function openBookForm(bookNum = -1) {
	if (formOpen) {
		return;
	}
	formOpen = true;

	document.querySelector('#book-form').classList.remove('hidden');
	let form = document.querySelector('#book-form')
	if (bookNum == -1) {
		// New book
		form.querySelector('#title').value = "";
		form.querySelector('#author').value = "";
		form.querySelector('#pages').value = "";
		form.querySelector('#no').checked = true;
		form.querySelector('#url').value = "";
		form.querySelector('#form-submit').setAttribute('data-bookId', -1);
	}
	else {

		form.querySelector('#title').value = library[bookNum].title;
		form.querySelector('#author').value = library[bookNum].author;
		form.querySelector('#pages').value = library[bookNum].pages;
		form.querySelector((library[bookNum].read) ? '#yes' : '#no').checked = true;
		form.querySelector('#url').value = library[bookNum].cover;
		form.querySelector('#form-submit').setAttribute('data-bookId', bookNum);
	}

}

function closeBookForm() {
	if (formOpen) {
		document.querySelector('#book-form').classList.add('hidden');
		formOpen = false;
	}
}

function sumbitBookForm(event) {
	let form = document.querySelector('#book-form');
	let bookNum = event.currentTarget.getAttribute('data-bookId')
	if (bookNum == -1) {
		library.push(new Book(form.querySelector('#title').value,
							  form.querySelector('#author').value,
							  form.querySelector('#pages').value,
							  form.querySelector('#yes').checked,
							  (form.querySelector('#url') == undefined) ? "" : form.querySelector('#url').value));
		closeBookForm();
		updateBookTiles();
		return;
	}
	library[bookNum].title = form.querySelector('#title').value;
	library[bookNum].author = form.querySelector('#author').value;
	library[bookNum].pages = form.querySelector('#pages').value;
	library[bookNum].read = form.querySelector('#yes').checked;
	library[bookNum].cover = form.querySelector('#url').value;
	closeBookForm();
	updateBookTiles();
}

function demo() {
	library.push(new Book("Flowers for Algernon", "Daniel Keyes", 311, true,
						  "https://images-na.ssl-images-amazon.com/images/I/41gvkhScVBL.jpg"));
	library.push(new Book("Digital Design", "Morris Mano", 516, false,
						  "https://images-na.ssl-images-amazon.com/images/I/51RX57XZ83L._SX360_BO1,204,203,200_.jpg"));
	library.push(new Book("Tonal Harmony with an Introduction to Twentieth-Century Music", "Stefan Kostka, Dorothy Payne", 736, false,
						  "https://images-na.ssl-images-amazon.com/images/I/41b--In4X3L.jpg"));
	library.push(new Book("The Complete Idiot's Guide to Music Composition", "Michael Miller", 264, false,
						  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386924417l/12510.jpg"));
	library.push(new Book("C++ Plus Data Structures", "Nell Dale", 816, false, ""));
	updateBookTiles()
}

function setup() {
	document.querySelector('#add-book-button').addEventListener('click', addBookToLibrary);
	document.querySelector('#logo-container').addEventListener('click', demo);

	document.querySelector('#form-cancel').addEventListener('click', closeBookForm);
	document.querySelector('#form-submit').addEventListener('click', sumbitBookForm);
	
}

setup();
updateBookTiles();