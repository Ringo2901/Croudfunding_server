const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const mediaRoutes = require('./routes/MediaRoutes');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.options('*', cors());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
