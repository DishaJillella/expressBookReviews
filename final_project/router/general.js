const axios = require('axios');


// TASK 10 – Get all books (async/await)
public_users.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({ message: "Error fetching books" });
  }
});


// TASK 11 – Get book by ISBN (async/await)
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/isbn/${req.params.isbn}`
    );
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({ message: "Error fetching ISBN" });
  }
});


// TASK 12 – Get by author (Promises)
public_users.get('/async/author/:author', (req, res) => {

  axios.get(`http://localhost:5000/author/${req.params.author}`)
    .then(response => res.status(200).json(response.data))
    .catch(() => res.status(500).json({ message: "Error fetching author" }));

});


// TASK 13 – Get by title (Promises)
public_users.get('/async/title/:title', (req, res) => {

  axios.get(`http://localhost:5000/title/${req.params.title}`)
    .then(response => res.status(200).json(response.data))
    .catch(() => res.status(500).json({ message: "Error fetching title" }));

});
