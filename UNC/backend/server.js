const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// UNC path (adjust this to your actual network share)
const uncPath = '\\\\DESKTOP-K61SAP6\\upload';

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uncPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));

app.post('/upload', (req, res) => {
  const { name, content } = req.body;

  // Decode the base64 data and write it to a file on the UNC path
  const base64Data = content.replace(/^data:.*,/, '');
  const filePath = path.join(uncPath, name);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      return res.status(500).send('File upload failed: ' + err.message);
    }
    res.send('File uploaded successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
