import express from 'express';
import cors from 'cors';
import tasks from './src/routes/routes.js';
import sequelize from './src/config/db.js';
import 'dotenv/config';


const app = express()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use('/api/tasks', tasks)


sequelize.sync({ alter: true }).then(() => {
    console.log('Database Connected!');

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
