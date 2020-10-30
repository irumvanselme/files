const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const orginMiddleware = require("./middlewares/orgin");

const FileConroller1 = require("./controllers/FileController1");
const FileConroller2 = require("./controllers/FileController2");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "DELETE, POST, PUT, GET, UPDATE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"
    );
    next();
});

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(orginMiddleware);

app.get("/", (req, res) =>
    res.send("Hello Here is Where To Upload Anselme's Files ")
);

app.use("/f/", express.static(path.join(__dirname, "files/v1/")));

app.use("/api/files/", FileConroller1);
app.use("/api/cruds/", FileConroller2);

const port = process.env.PORT || 2003;
app.listen(port, () => console.log(`Listening on port ${port}..`));
