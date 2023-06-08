import express from 'express';
import { userRoute } from './route/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/user', userRoute);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
