require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(staticMiddleware);

app.get('/api/getCars', (req, res, next) => {
  const sql = `
  select *
  from "cars"
  `;

  db.query(sql)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/saveCar', (req, res, next) => {

  const { make, model, color, year } = req.body;
  if (!make || !model || !color || !year) {
    throw new ClientError(400, 'make, model, color, and year are required fields');
  }

  const sql = `
  insert into "cars" ("make", "model",  "color", "year")
  values ($1, $2, $3, $4)
  returning *
  `;

  const sqlParams = [make, model, color, year];

  db.query(sql, sqlParams)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
