import "../css/styles.scss";
import { fetchBooksByCategory, fetchBookDescription } from './api';
import { renderBookList, renderBookDescription } from './dom';
import { debounce } from './utils';
import '../img/favicon.ico';


let currentCategory = '';
let currentOffset = 0;
const limit = 20;
let allBooks = [];

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('categoryInput');
  const searchBtn = document.getElementById('searchBtn');

  async function searchBooks() {
    currentCategory = input.value.trim();
    if (!currentCategory) {
      alert("Please enter a category");
      return;
    }
    currentOffset = 0;
    allBooks = [];
    await loadMoreBooks();
  }

  async function loadMoreBooks() {
    const books = await fetchBooksByCategory(currentCategory, limit, currentOffset);
    allBooks = [...allBooks, ...books];
    renderBookList(allBooks, handleBookClick, loadMoreBooks);
    currentOffset += limit;
  }

 async function handleBookClick(book) {
  const description = await fetchBookDescription(book.key);
  renderBookDescription(description, book.cover_id, book.title);
}

  searchBtn.addEventListener('click', searchBooks);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBooks();
  });
});
