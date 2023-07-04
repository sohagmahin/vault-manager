const app = require("./app");
const connectDB = require("./helpers/connectDB");
const PORT = process.env.PORT || 3001;

//connect to mongoDB
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
