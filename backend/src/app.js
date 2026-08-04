const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth.routes');
const googleAuthRoutes = require('./routes/auth');
const attemptsRoutes = require('./routes/attempts.routes');


function createApp() {

  const app = express();


  // Security
  app.use(
    helmet({
      crossOriginResourcePolicy:false
    })
  );


  // FIXED CORS
  app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://127.0.0.1:8080",
      "http://localhost:8080"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

  // JSON
  app.use(
    express.json()
  );



  // logger
  app.use(
    morgan('dev')
  );



  // limit
  app.use(
    rateLimit({
      windowMs:15*60*1000,
      limit:200,
      standardHeaders:true,
      legacyHeaders:false
    })
  );



  // passport (stateless — JWT only, no server-side sessions)
  app.use(passport.initialize());



  // routes
  app.use(
    "/api/auth",
    authRoutes
  );

  app.use("/api/v1/auth", googleAuthRoutes);

  app.use("/api/attempts", attemptsRoutes);



  // test route
  app.get("/",(req,res)=>{

    res.json({
      message:"Backend is running"
    });

  });



  app.get("/health",(req,res)=>{

    res.json({
      ok:true
    });

  });




  // 404
  app.use((req,res)=>{

    res.status(404).json({
      message:"Not found"
    });

  });



  // errors
  app.use(
    (err,req,res,next)=>{

      console.error(err);

      res.status(500).json({

        message:
        err.message || "Server error"

      });

    }
  );



  return app;

}


module.exports={
createApp
};