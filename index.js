import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './Database/Config.js';
import userRouter from './Routers/userRoute.js';

const app = express();
app.use(express.json());

dotenv.config();

app.use(cors({
    origin:"*",
    credentials: true,
}));
//DB connection
connectDB();


//route
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.status(200).send("hi welcome to the password  resetting task")

})

app.listen(process.env.PORT, () =>{
 console.log('Server running on port')
});
