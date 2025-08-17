# BOOK SEARCHING PROJECT

<img width="1597" height="758" alt="project photo for github js 2" src="https://github.com/user-attachments/assets/0c4feaf9-69a0-42a0-ac6c-8ac8ac9b90b6" />
<img width="1591" height="752" alt="project photo2 for github js 2" src="https://github.com/user-attachments/assets/856860fc-8ee7-47f8-a7b5-b770417616a9" />

This is the second JavaScript project I worked on for [Start2Impact's](https://www.start2impact.it/) frontend development course. It allows users to look up books
using the [Open Library API](https://openlibrary.org/developers/api).  

---


## Features and link
This webpage lets the user search books by category (e.g. Fantasy, Romance, Science) and returns a list of books. It's possible to view the description of each book by clicking on a specific button that shows
a modal popup that displays it. 
It can be found at the following link: [live website URL](https://progetto-javascript-advanced-ia.netlify.app/)

---

## Built with
- HTML, CSS, Sass
- JavaScript
- Webpack
- Axios
- Lodash 
- Open Library API

---

## What I learned and JavaScript files overview

- index.js is the glue that ties everything together. It initializes event listeners (like the search form) and calls functions from other modules (api.js, dom.js) to handle fetching data and updating the UI.
- api.js handles all communication with the Open Library API through functions like fetchBooksByCategory. The API requests are made using Axios; these are then converted into an API call and return book data.
- dom.js is responsible for managing the user interface. It creates book cards and modals that show book cover, title, author, and description dynamically in the DOM. 
- utils.js is used for small reusable functions. Example: capitalizing category names, formatting data before rendering. 
