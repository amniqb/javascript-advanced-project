import noCoverImage from '../img/nocoverimage.jpg';

export function renderBookList(books, onBookClick, onLoadMore, totalAvailable = null) {
  const resultsDiv = document.getElementById('results');

  resultsDiv.classList.add('books-container');
  resultsDiv.innerHTML = '';


  if (!Array.isArray(books) || books.length === 0 || books[0].title === "No books found") {
    const noBooksCard = document.createElement('div');
    noBooksCard.className = 'book-card no-books-card';

    const img = document.createElement('img');
    img.src = noCoverImage;
    img.alt = 'No books found';

    const info = document.createElement('div');
    info.className = 'book-info';
    const message = document.createElement('p');
    message.textContent = 'No books found.';
    info.appendChild(message);

    noBooksCard.appendChild(img);
    noBooksCard.appendChild(info);
    resultsDiv.appendChild(noBooksCard);
    return;
  }


  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    const img = document.createElement('img');
    img.src = book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
      : 'https://via.placeholder.com/200x300?text=No+Cover';
    img.alt = `${book.title} cover`;

    const info = document.createElement('div');
    info.className = 'book-info';
    const titleEl = document.createElement('h3');
    titleEl.textContent = book.title;
    const authorEl = document.createElement('p');
    authorEl.textContent = book.authors?.[0]?.name || 'Unknown author';
    info.appendChild(titleEl);
    info.appendChild(authorEl);

    const btn = document.createElement('button');
    btn.className = 'desc-btn';
    btn.type = 'button';
    btn.textContent = 'Description';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      onBookClick(book);
    });

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(btn);
    resultsDiv.appendChild(card);
  });

 
  if (typeof onLoadMore === 'function' && (!totalAvailable || books.length < totalAvailable)) {
    const more = document.createElement('button');
    more.className = 'load-more';
    more.type = 'button';
    more.textContent = 'Load more';
    more.addEventListener('click', onLoadMore);
    resultsDiv.appendChild(more);
  }
}

export function renderBookDescription(description, coverId, title) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');

  modalBody.innerHTML = `
    <h2>${title}</h2>
    ${coverId ? `<img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="${title} cover" style="max-width:200px; display:block; margin-bottom:10px;">` : ''}
    <p>${description}</p>
  `;

  modal.style.display = 'block';

  document.getElementById('closeModal').onclick = () => (modal.style.display = 'none');
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
}
