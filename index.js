import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
import routes from './Routes.js';

dotenv.config();
const { json } = pkg;
const app = express();
app.use(cors());
app.use(json());

connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
