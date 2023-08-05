const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3003;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.get('/cards', (req, res) => {
  fs.readdir('./cards', (err, files) => {
    if(err) {
      console.log(err);
      res.status(500).send('Unable to read directory');
    }

    const images = files.filter(file => path.extname(file).toLowerCase() === '.png');
    res.json(images);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
