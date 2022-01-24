import express from "express";
import bodyParser from "body-parser";
import userRoutes from './routes/users.js';
import inventoryRoutes from './routes/inventory.js'
import cors from 'cors'

const app = express();
const SERVER_PORT = 9000;


app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/inventory', inventoryRoutes);
app.all('*', (req, res) => res.send('404 !, Not Found'));

app.listen(SERVER_PORT, () => console.log(`Server is running on port: http://localhost:${SERVER_PORT}`));