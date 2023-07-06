const app = require("./app");
const connectDB = require("./helpers/connectDB");

//connect to mongoDB
connectDB();

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
