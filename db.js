/* import { Client } from 'pg';

const connectionString = 'postgresql://postgres:moatXF@ctor1@localhost:5432/migratenode';


const client = new Client({
  connectionString,
});
client.connect()
  .then(() => console.log('Connected to postgres...'))
  .catch(err => console.log('Could not connect', err));

const myrow = client.query('SELECT * FROM myuser');
console.log(myrow);

const getAllRequests = async () => {
  const { rows } = await client.query('SELECT * FROM myuser');
  console.log(rows);
};

getAllRequests();
 */