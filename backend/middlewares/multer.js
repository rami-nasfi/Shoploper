const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
