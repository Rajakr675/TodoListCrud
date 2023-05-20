const multer = require("multer");

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .pdf, .png, .jpg and .jpeg format allowed!"));
  }
};

const productUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        `.${file.originalname.split(".").pop()}`
    );
  },
});

const productImage = multer({
  storage: productUpload,
  fileFilter: filefilter,
  limits: { fileSize: 5242880 },
});

module.exports = {
  product: productImage,
};