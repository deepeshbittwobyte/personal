const express = require('express');
const app = express();
const db = require('./db');

const DEFAULT_PORT = 8000;

// Function to check if a port is available
function isPortTaken(port, callback) {
  const net = require('net');
  const tester = net.createServer()
    .once('error', err => (err.code == 'EADDRINUSE' ? callback(null, true) : callback(err)))
    .once('listening', () => tester.once('close', () => callback(null, false)).close())
    .listen(port);
}

// Check if the default port is available, if not, use a different one
isPortTaken(DEFAULT_PORT, (err, inUse) => {
  const PORT = inUse ? 0 : DEFAULT_PORT; // If the default port is in use, assign a random available port

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM saas_gfs_ecm.tb_policies';

    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

