const express = require("express");
const fs = require("fs");

const router = express.Router();

router.post("/new", (req, res) => {
    let name = Date.now() + ".txt";
    fs.createWriteStream("Files/Texts/" + name);
    res.send({ name: name, success: 1 });
});

router.post("/edit_file", (req, res) => {
    let name = req.body.name;
    let data = req.body.data;

    fs.writeFileSync(name, data);

    res.send({ data: data, success: 1 });
});

router.get("/read_file", (req, res) => {
    let name = req.body.name;

    let data = fs.readFileSync(name, { encoding: "utf8" });

    res.send({ data: data });
});

router.post("/delete_file", (req, res) => {
    let name = req.body.name;

    fs.unlinkSync(name);

    res.send({ success: 1 });
});

module.exports = router;
