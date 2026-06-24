require('dotenv').config();

const mongoose = require('mongoose');
const { createApp } = require('./app');


async function main(){

const app=createApp();

const port=process.env.PORT || 5000;


await mongoose.connect(
process.env.MONGODB_URI
);


console.log("MongoDB connected");


app.listen(port,()=>{

console.log(
`Backend listening on port ${port}`
);

});


}


main();