const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let direccionAvatars = path.join(__dirname, "../../public/images/avatars");
        cb(null, direccionAvatars);
    },
    filename: (req, file, cb) => {
        let avatar = "Avatar" + "-" + Date.now() + path.extname(file.originalname);
        cb(null, avatar);
    }
})
const subirArchivo = multer({storage});

module.exports = subirArchivo