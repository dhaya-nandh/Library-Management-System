  let books = [];
        
        function addBook() {
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const genre = document.getElementById('genre').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value);

            if (title && author && genre && quantity) {
                books.push({ title, author, genre, quantity });
                localStorage.setItem('books', JSON.stringify(books));
                displayBooks();
                alert('Book added successfully!');
                document.getElementById('title').value = '';
                document.getElementById('author').value = '';
                document.getElementById('genre').value = '';
                document.getElementById('quantity').value = '';
            } else {
                alert('Please fill in all fields.');
            }
        }

        function displayBooks() {
            const table = document.getElementById('bookTable');
            table.innerHTML = '';
            books.forEach(book => {
                const row = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.quantity}</td>
                </tr>`;
                table.innerHTML += row;
            });
        }

        function searchBooks() {
            const query = document.getElementById('search').value.toLowerCase();
            const filtered = books.filter(book => book.title.toLowerCase().includes(query));
            const table = document.getElementById('bookTable');
            table.innerHTML = '';
            filtered.forEach(book => {
                const row = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.quantity}</td>
                </tr>`;
                table.innerHTML += row;
            });
        }

        window.onload = function() {
            const storedBooks = localStorage.getItem('books');
            if (storedBooks) {
                books = JSON.parse(storedBooks);
                displayBooks();
            }
        }
    function borrowBook() {
    const title = document.getElementById('borrowTitle').value.trim();
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (book && book.quantity > 0) {
        book.quantity--;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        alert('Book borrowed successfully!');
    } else {
        alert('Book not available or not found.');
    }
}

    function returnBook() {
    const title = document.getElementById('returnTitle').value.trim();
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (book) {
        book.quantity++;
    } else {
        books.push({ title, author: "Unknown", genre: "Unknown", quantity: 1 });
    }

    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    alert('Book returned successfully!');
}

function accessAdmin() {
    const password = document.getElementById('adminPassword').value;
    const message = document.getElementById('adminMessage');
    if (password === "admin123") {
        message.textContent = "Access granted. Welcome, Admin!";
    } else {
        message.textContent = "Access denied. Incorrect password.";
        message.style.color = "red";
    }
}
let borrowedBooks = [];
let returnedBooks = [];

function borrowBook() {
    const title = document.getElementById('borrowTitle').value.trim();
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (book && book.quantity > 0) {
        book.quantity--;
        borrowedBooks.push({ title: book.title, date: new Date().toLocaleString() });
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        displayBooks();
        displayBorrowed();
        alert('Book borrowed successfully!');
    } else {
        alert('Book not available or not found.');
    }
}

function returnBook() {
    const title = document.getElementById('returnTitle').value.trim();
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (book) {
        book.quantity++;
    } else {
        books.push({ title, author: "Unknown", genre: "Unknown", quantity: 1 });
    }

    returnedBooks.push({ title, date: new Date().toLocaleString() });
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('returnedBooks', JSON.stringify(returnedBooks));
    displayBooks();
    displayReturned();
    alert('Book returned successfully!');
}

function displayBorrowed() {
    const table = document.getElementById('borrowedTable');
    table.innerHTML = '';
    borrowedBooks.forEach(entry => {
        const row = `<tr><td>${entry.title}</td><td>${entry.date}</td></tr>`;
        table.innerHTML += row;
    });
}

function displayReturned() {
    const table = document.getElementById('returnedTable');
    table.innerHTML = '';
    returnedBooks.forEach(entry => {
        const row = `<tr><td>${entry.title}</td><td>${entry.date}</td></tr>`;
        table.innerHTML += row;
    });
}

window.onload = function() {
    const storedBooks = localStorage.getItem('books');
    const storedBorrowed = localStorage.getItem('borrowedBooks');
    const storedReturned = localStorage.getItem('returnedBooks');

    if (storedBooks) books = JSON.parse(storedBooks);
    if (storedBorrowed) borrowedBooks = JSON.parse(storedBorrowed);
    if (storedReturned) returnedBooks = JSON.parse(storedReturned);

    displayBooks();
    displayBorrowed();
    displayReturned();
}