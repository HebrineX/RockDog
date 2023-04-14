const multer = require("multer");
const path = require("path");
const storage = require("../middlewares/multerProd");



const subirArchivo = multer({
	storage, 
	limits: {fileSize: 10485760},
	fileFilter: (req,file,cb)=>{
		   let type = file.mimetype.startsWith("image/")
			if (type){
				cb(null,true)
			}else{
			cb(rangoDios)
		}}
	}

);
module.exports = subirArchivo