require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');
const { createApp } = require('./app');

// The mongodb+srv:// lookup needs a resolver that can do SRV records.
// On some Windows setups the system resolver can't do that, so we fall
// back to public DNS (8.8.8.8/1.1.1.1) — but those aren't reachable on
// every network either (VPNs, hotel/campus wifi, some ISPs), so try the
// system resolver first and only switch if it fails.
async function connectWithDnsFallback() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.warn('MongoDB connect failed with system DNS, retrying with public DNS (8.8.8.8/1.1.1.1)...', err.code || err.message);
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

async function main(){

const app=createApp();

const port=process.env.PORT || 5000;


await connectWithDnsFallback();


console.log("MongoDB connected");

app.listen(port,()=>{

console.log(
`Backend listening on port ${port}`
);

});


}


main();