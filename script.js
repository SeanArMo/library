const container = document.querySelector('.container');
const add_book_btn = document.querySelector('.add-book');
const body = document.querySelector('body');

let h1 = document.querySelector('h1');

let buttonClicked = false;

const submit_btn = document.createElement('button');
submit_btn.setAttribute('class', 'submit');
submit_btn.textContent = 'Submit Book';

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = () => {
        let info = `${title} by ${author}, ${pages} pages, ${isRead ? "already read" : "not read yet"}.`;
        return info;
    };
};

function removeBook (e){
    console.log(e);
};

function createBook(title, author, pages, isRead) {
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'book');

    let bookBtns = document.createElement('div');
    bookBtns.classList.add('action-btns');

    let rmvBtn = document.createElement('button');
    rmvBtn.setAttribute('class', 'remove btn');
    rmvBtn.textContent = 'Remove';

    let toggleRead = document.createElement('button');
    toggleRead.setAttribute('class', 'toggle-read btn');
    toggleRead.textContent = 'Read';

    let pTitle = document.createElement('p');
    pTitle.setAttribute('class', 'title');
    pTitle.textContent = `${title}`;
    let pAuthor = document.createElement('p');
    pAuthor.setAttribute('class', 'text-info');
    pAuthor.textContent = `Author: ${author}`;
    let pPages = document.createElement('p');
    pPages.setAttribute('class', 'text-info');
    pPages.textContent = `Pages: ${pages}`;
    let pIsRead = document.createElement('p');
    pIsRead.setAttribute('class', 'text-info read');
    pIsRead.textContent = `Have you read the book: ${isRead ? "Yes" : "No"}`;

    container.appendChild(bookDiv);
    bookDiv.appendChild(pTitle);
    bookDiv.appendChild(pAuthor);
    bookDiv.appendChild(pPages);
    bookDiv.appendChild(pIsRead);

    bookDiv.appendChild(bookBtns);
    bookBtns.appendChild(toggleRead);
    bookBtns.appendChild(rmvBtn);

    rmvBtn.addEventListener('click', (e) => {
        let event = e.composedPath();
        btnToRmv = event[2];
        container.removeChild(btnToRmv);
    });

    toggleRead.addEventListener('click', (e) => {
        let event = e.composedPath();
        btnPath = event[2];
        currentState = btnPath.childNodes[3].textContent;
        
        if (currentState === "Have you read the book: No") {
            let newState = document.createElement('p');
            newState.textContent = "Have you read the book: Yes";
            newState.setAttribute('class', 'text-info read');

            btnPath.removeChild(bookBtns);
            btnPath.removeChild(btnPath.childNodes[3]);

            btnPath.appendChild(newState);
        } else {
            let newState = document.createElement('p');
            newState.textContent = "Have you read the book: No";
            newState.setAttribute('class', 'text-info read');

            btnPath.removeChild(bookBtns);
            btnPath.removeChild(btnPath.childNodes[3]);

            btnPath.appendChild(newState);
        }

        btnPath.appendChild(bookBtns);
        bookBtns.appendChild(toggleRead);
        bookBtns.appendChild(rmvBtn);
    });
};

function addBookToLibrary() {
    const formDiv = document.createElement('div');
    formDiv.setAttribute('class', 'form-div');

    body.appendChild(formDiv);

    const form = document.createElement('form');

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'What is the title of the book?';
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Who is the author of the book?';
    const pagesLabel = document.createElement('label');
    pagesLabel.textContent = 'How many pages are in the book';
    const isReadLabel = document.createElement('label');
    isReadLabel.textContent = 'Have you read the book? ';

    let title = document.createElement('input');
    title.setAttribute('type', 'text');
    let author = document.createElement('input');
    author.setAttribute('type', 'text');
    let pages = document.createElement('input');
    pages.setAttribute('type', 'text');
    let isRead = document.createElement('input');
    isRead.setAttribute('type', 'checkbox');

    formDiv.appendChild(form);
    form.appendChild(titleLabel);
    form.appendChild(authorLabel);
    form.appendChild(pagesLabel);
    form.appendChild(isReadLabel);

    titleLabel.appendChild(title);
    authorLabel.appendChild(author);
    pagesLabel.appendChild(pages);
    isReadLabel.appendChild(isRead);

    formDiv.appendChild(submit_btn);

    submit_btn.addEventListener('click', () => {
        submit_btn.classList.add('animation');
        body.removeChild(formDiv);
        isRead.value = isRead.value.toLowerCase();
        myLibrary.push(new Book(title.value, author.value, pages.value, isRead.checked));
        createBook(title.value, author.value, pages.value, isRead.checked);
        h1.classList.remove('blured');
        add_book_btn.classList.remove('blured');
        container.classList.remove('blured');
    });
};

add_book_btn.addEventListener('click', () => {
    add_book_btn.classList.add('animation');
    let books = document.querySelectorAll('.book');
    h1.classList.add('blured');
    add_book_btn.classList.add('blured');

    container.classList.add('blured');

    addBookToLibrary();
    buttonClicked = true;
});

add_book_btn.addEventListener('transitionend', () => {
    add_book_btn.classList.remove('animation');
});

submit_btn.addEventListener('transitionend', () => {
    submit_btn.classList.remove('animation');
});
