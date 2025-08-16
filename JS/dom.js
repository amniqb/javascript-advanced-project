export function renderBookList(books, onBookClick, onLoadMore) {
  const resultsDiv = document.getElementById('results');

  resultsDiv.classList.add('books-container');
  resultsDiv.innerHTML = '';

  if (!Array.isArray(books) || books.length === 0) {
    resultsDiv.innerHTML = '<p>No books found.</p>';
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

  
  if (typeof onLoadMore === 'function') {
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
