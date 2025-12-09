import Product from "../models/productmodel.js";

export const create = (req, res) => {
    let categoryid = req.body.categoryid;
    if(!req.body.name || (!isNaN(parseInt(categoryid)) && categoryid === 0)){
        res.status(400).send({
            message: 'El nombre del producto y la categoria no pueden estar vacios'
        });
        return;
    }

    const newProduct = new Product({
        categoryid: req.body.categoryid,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    });

    let id = req.body.id;
    console.log('ID recibido:', id);
    if(id && id != 0 && typeof parseInt(id) === 'number' ? true : false){Product.id = id}

    console.log('Nuevo producto a crear:', newProduct);

    Product.create(newProduct, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear el producto"
            });
        }else{
            res.send({message : `Product ${data.name} con id ${data.id} creado exitosamente & categoria id ${data.categoryid} creada exitosamente`});
        }
    });
}