const express = require("express");
const connectDB = require("./config/database");
const cors = require('cors');
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // specify the allowed origin
    credentials: true, // allow credentials
  };

app.use(cors(corsOptions));

connectDB();

app.use(express.json());


app.use("/api/auth", require("./routes/auth"));
app.use("/api/symptom", require("./routes/symptom"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
