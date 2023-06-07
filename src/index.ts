import express from 'express';
import { createUser, editUser } from './controller/';

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/user', (req, res) => createUser);
app.put('/user', (req, res) => editUser);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
