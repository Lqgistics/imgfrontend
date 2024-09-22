const express = require('express');
const next = require('next');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const upload = multer({ dest: 'uploads/' });

  server.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // Create FormData and add the file
      let data = new FormData();
      data.append('file', fs.createReadStream(req.file.path));

      // Axios configuration for the API request
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://dbrad.engineer/files',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZWM0YmYzMS0wODVmLTQ4OWYtOGZkNS05Y2U5ZDMxM2RiNjUiLCJleHAiOjE3MjY1MTY5OTMsImlhdCI6MTcyNjUxMzM5M30.bR73onOXKC3O2dGxMKruer_4R8UwwD_Sa2UhPZY_7oQ',
          ...data.getHeaders(),
        },
        data: data,
      };

      // Make the request to the API
      const response = await axios(config);

      // Return the API response to the frontend
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading file');
    }
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running on http://localhost:3000');
  });
});