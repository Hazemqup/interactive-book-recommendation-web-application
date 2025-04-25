//list books
const books = [
    { title: "1984", author: "George Orwell", genre: "dystopian", price: 10, rating: 4.9, year: 1949, description: "Dystopian classic." },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "fantasy", price: 12, rating: 4.8, year: 1937, description: "Adventure in Middle-earth." },
    { title: "Dune", author: "Frank Herbert", genre: "science-fiction", price: 15, rating: 4.7, year: 1965, description: "Sci-fi epic on Arrakis." },
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", genre: "mystery", price: 8, rating: 4.3, year: 1892, description: "Detective adventures." },
    { title: "Project Hail Mary", author: "Andy Weir", genre: "science-fiction", price: 14, rating: 4.6, year: 2021, description: "Space rescue mission." },
    { title: "The Midnight Library", author: "Matt Haig", genre: "fantasy", price: 11, rating: 4.2, year: 2020, description: "A magical journey through parallel lives." },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "mystery", price: 9, rating: 4.1, year: 2005, description: "A thrilling Nordic crime mystery." },
    { title: "Fahrenheit 451", author: "Ray Bradbury", genre: "dystopian", price: 7, rating: 4.4, year: 1953, description: "A world where books are forbidden." }
  ];
  
  //handle form submission
  document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();// Prevent the page from refreshing
    // Get the values from the form inputs
    const genre = document.getElementById("genre").value;
    const author = document.getElementById("author").value.toLowerCase();
    const price = parseFloat(document.getElementById("price").value);
    const rating = parseFloat(document.getElementById("rating").value);
    const year = parseInt(document.getElementById("year").value);
  
    // Filter the books based on the selected criteria
    const filtered = books.filter(book =>
      (genre === "all" || genre === "" || book.genre === genre) &&
      (author === "" || book.author.toLowerCase().includes(author)) &&
      (isNaN(price) || book.price <= price) &&
      (isNaN(rating) || book.rating >= rating) &&
      (isNaN(year) || book.year >= year)
    );
  // Display the results
    showResults(filtered);
  });
  
  // Function to display the filtered books
  function showResults(filteredBooks) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
  
    if (filteredBooks.length === 0) {
      resultDiv.innerHTML = "<p>No books found. Try adjusting your filters.</p>";
      return;
    }
  
    const bestMatch = filteredBooks.reduce((best, current) =>
      (current.rating - current.price / 10) > (best.rating - best.price / 10) ? current : best
    );
  //loop through the filtered books and display them
    filteredBooks.forEach(book => {
      const div = document.createElement("div");
      div.className = "book" + (book === bestMatch ? " best-match" : "");
      //fill book details in html
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Price:</strong> £${book.price}</p>
        <p><strong>Rating:</strong> ${book.rating}</p>
        <p>${book.description}</p>
        <button onclick="addToWishlist('${book.title}')">Add to Wishlist</button>
      `;
      resultDiv.appendChild(div);
    });
  }
  // Function to add a book to the wishlist
  function addToWishlist(title) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    //prevent duplicates
    if (!wishlist.includes(title)) {
      wishlist.push(title);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      displayWishlist();
    }
  }
  
  // Function to remove a book from the wishlist
  function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
  }
  
  // Function to display the wishlist
  function displayWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistDiv = document.getElementById("wishlist");
    wishlistDiv.innerHTML = "";
  
    wishlist.forEach((title, index) => {
      const item = document.createElement("div");
      item.className = "wishlist-item";
  
      const span = document.createElement("span");
      span.textContent = title;
  
      const button = document.createElement("button");
      button.textContent = "Remove";
      button.onclick = () => removeFromWishlist(index);
  
      item.appendChild(span);
      item.appendChild(button);
      wishlistDiv.appendChild(item);
    });
  }
  //show wishlist on page load
  window.onload = displayWishlist;
  