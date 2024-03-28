const mongoose = require("express");
//require the connection to the database in config folder
const db = require("./config/connection");

// Require the models
const { } = require("./models");

const PORT = process.env.PORT || 3001;
//instantiate the express server
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});