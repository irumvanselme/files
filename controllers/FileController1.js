const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, "./Files/Uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + getExt(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post("/one", upload.single("file"), async (req, res) => {
    try {
        return res.send({ file_name: req.file.filename });
    } catch (error) {
        res.send(error);
    }
});

router.post("/many", upload.array("files"), async (req, res) => {
    try {
        let file_names = [];
        for (let i = 0; i < req.files.length; i++)
            file_names.push(req.files[i].filename);

        return res.send({ file_names: file_names });
    } catch (error) {
        res.send(error);
    }
});

router.delete("/all", async (req, res) => {
    fs.rmdir("Files/Uploads", { recursive: true }, (error) => {
        if (error) throw error;
        fs.mkdir("Files/Uploads", (err) => {
            if (err) throw err;
        });
    });

    return res.send({ message: "All files deleted !" });
});

function getExt(name) {
    let words = name.split(".");
    return "." + words[words.length - 1];
}

module.exports = router;
