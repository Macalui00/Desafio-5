const express = require("express");

const productos = [
    {
    "id": 1,
    "titulo": "bananas",
    "precio": 200.00,
    "url": "https://m.media-amazon.com/images/I/61fZ+YAYGaL._SL1500_.jpg"
    },
    {
    "id": 2,
    "titulo": "manzanas",
    "precio": 360.00,
    "url": "https://tramosdelmercado.odoo.com/web/image/product.template/215/image_1024?unique=68c581a"
    },
    {
    "id": 3,
    "titulo": "paltas",
    "precio": 160.00,
    "url": "https://storage.googleapis.com/portalfruticola/2020/02/6c4efcae-palta-shutterstock_263066297.jpg"
    }
];

let contador = 3;

function validarProducto(req, res, next){
    const { titulo, precio, url } = req.body;

    if(!titulo || !precio || !url){
        if(!titulo){
            res.status(400).json({ error : 'Falta ingresar el título del producto.'});
        }

        if(!precio){
            res.status(400).json({ error : 'Falta ingresar el precio del producto.'});
        }

        if(!url){
            res.status(400).json({ error : 'Falta ingresar el url del producto.'});
        }        
    } else {
        next();        
    }
}

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//endpoints
app.get("/productos", (req,res) => {
    const listExists = productos.length > 0 ? true : false
    res.render("pages/productos",{productos: productos, listExists: listExists});
});

app.post('/productos', validarProducto, (req, res) => {
    const { titulo, precio, url } = req.body;
    contador += 1;
    const producto = {
        "id": contador,
        "titulo": titulo,
        "precio": precio,
        "url": url
    };
    productos.push(producto);
    res.status(200).json(producto);
    res.redirect('/');
});

app.get('/', (req,res) => {
    res.render('pages/form', {})
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor express escuchando en el puerto ${PORT}`
    );
});

server.on('error', err => console.log(`error: ${err}`));