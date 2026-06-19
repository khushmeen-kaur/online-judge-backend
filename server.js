require('dotenv').config({path:'./src/.env'});


const app=require('./src/app.js');
const connectToDB=require('./src/config/db.js');
const PORT=process.env.PORT || 3000;

const startServer=async () =>{
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    });
}

startServer();