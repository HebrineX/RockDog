const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let direccionAvatars = path.join(__dirname, "../../public/images/productos");
        cb(null, direccionAvatars);
    },
    filename: (req, file, cb) => {
        if(file){
        let avatar = "Producto" + "-" + Date.now() + path.extname(file.originalname);
        cb(null, avatar);
        }else{
            console.log("no subiste una imagen pah")
        }
    }
})
const subirArchivo = multer({storage});

module.exports = subirArchivo