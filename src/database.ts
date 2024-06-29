import knex from 'knex';
import { config } from 'dotenv'
config();

const dbPort: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

const db = knex({
  client: 'mysql2',
  connection: {
    host:  process.env.DB_HOST,
    port:  dbPort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: { min: 0, max: 7 },
});

// Check if connection is successful
db.raw('SELECT 1')
    .then(() => {
        console.log('Connected to Lendsqr_wallet database successfully.');
    })
    .catch((err) => {
        console.error('Error connecting to MySQL database:', err);
    });


export default db;
