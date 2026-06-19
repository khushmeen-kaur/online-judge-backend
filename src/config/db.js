const mongoose=require('mongoose');

const connectToDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        const err = new Error("MONGO_URI is not defined");
        console.log("error connecting to database", err);
        process.exit(1);
    }

    mongoose.connect(uri)
        .then(() => {
            console.log("connected to database successfully");
        })
        .catch(err => {
            console.log("error connecting to database", err);
            process.exit(1); // server gets closed if there is an error connecting to database
        });
};

module.exports = connectToDB;
