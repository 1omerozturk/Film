const express=require('express');
const connectDb=require('./config/db');
const cors=require('cors')
require('dotenv').config();


// app connect to express

const app=express();

// database connection
connectDb();
app.use(cors());
app.use(express.json());

app.use('/api/movies',require('./routes/movieRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/',require('./routes/reviewRoutes'));
app.use('/api/genre',require('./routes/genreRoutes'));
app.use('/api/search',require('./routes/searchRoutes'))

const PORT=process.env.PORT||5000;
app.listen(PORT,()=> console.log(`Server is running on http://localhost:${PORT}`));