//-----------Constantes y aplicaciones para que todo funcione
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session")
const cookieParser = require('cookie-parser');
const recordameMiddle = require("./middlewares/recordameMiddle")
const locals = require("./middlewares/localsGlobal")


app.use(express.urlencoded({extended : false}));
app.use(express.json())
app.use(methodOverride("_method"))
app.use(session({secret:"Shh es un secreto (?? !"}))
app.use(cookieParser());
app.use(recordameMiddle)

app.use(express.static(path.join(__dirname, '../public')))


app.use(locals)

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// ----------Requerimiento de rutas--------------
const rutaMain = require("./routes/main.js");
const rutaProductos = require("./routes/productos.js");
const rutaUsuarios = require("./routes/usuarios.js");
// ----------Requerimiento de rutas api--------------
const apiUserRouter = require("./routes/api/usuarios.js")
const apiProductosRouter = require("./routes/api/productos.js")

//  rutas

app.use("/", rutaMain);

app.use("/user", rutaUsuarios);

app.use("/productos", rutaProductos);
// apis
app.use ("/api/user",apiUserRouter)
app.use("/api/productos",apiProductosRouter)

// errores
app.use((req,res,next)=>{
    res.status(404).render("error")
})



//  console.log
app.listen(process.env.PORT ||3000, ()=> {
    console.log("Rockdog esta on!");
});


