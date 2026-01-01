const dialog = document.querySelector("dialog");
const showButton = document.getElementById("btn-add");

const btnConfirm = document.getElementById("btn-confirm");
const form = dialog.querySelector("form");
const btnCancel = document.getElementById("btn-cancel");

const selectEl = document.querySelector("select");
const inputBookName = document.querySelector("#inputBookName");
const inputAuthorName = document.querySelector("#inputAuthorName");
const inputPages = document.querySelector("#inputPages");

const libraryCont = document.getElementById("div-library")

//darkmode


//==============


// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
btnCancel.addEventListener("click", () => {
  clearForm()
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  addBookToLibrary();
  clearForm()

  dialog.close(selectEl.value);
});


const myLibrary = [];

//book constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const title = inputBookName.value
  const author = inputAuthorName.value
  const pages = inputPages.value
  const status = selectEl.value

  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  console.log(myLibrary);

  renderLibrary()
}

function clearForm() {
  inputBookName.value = "";
  inputAuthorName.value = "";
  inputPages.value = "";
}


function renderLibrary() {
  libraryCont.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    if(book.title === ""){
      book.title = "(empty)"
    }
    if(book.author === ""){
      book.author = "-"
    }
    if(book.pages === ""){
      book.pages = 0
    }

    card.innerHTML = `
      <h3 style="color:white">${book.title}</h3>
      <p><strong>by:</strong> ${book.author}</p>
      <p class="txt-pages"><strong>Pages:</strong> ${book.pages}</p>
      <p class="txt-read"><strong>Read?:</strong> ${book.status}</p>
      <button data-index="${index}" class="btn-edit-card">Edit</button>
      <button data-index="${index}" class="btn-delate-card">Delete</button>
    `;

    libraryCont.appendChild(card);
  });

  addDeleteEvents();
}


//button delete
function addDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".card .btn-delate-card");

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      myLibrary.splice(index, 1);
      renderLibrary();
    });
  });
}


//edit function
function addEditEvents(){

}





//ver localstorage