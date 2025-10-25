const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',
        hasBody: true,
        purpose: "El metodo Post se utiliza para enviar una entidad a un recurso especifico, causando, a menudo un cambio en el estado o efectos secundarios en el servidor."

    }, 
    {
        method: 'PUT',
        hasBody: true,
        purpose: "El método PUT reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición."
    },
    {
        method: 'PATCH',
        hasBody: true,
        purpose: "El método PATCH ES utilizado para aplicar modificaciones parciales a un recurso."
    },
    {
        method: 'HEAD',
        hasBody: false,
        purpose: "El metodo Head pide una respuesta identica a la de una peticion GET, pero sin el cuerpo de la respuesta."
    },{
        method: 'GET',
        hasBody: false,
        purpose: "El método GET solicita una representación de un recurso especifico. Las peticiones que utilizan el metodo GET solo deben recuperar datos."
    },
    {
        method: 'DELETE',
        hasBody: false,
        purpose: "El metodo DELETE elimina un recurso especifico."
    }]
    const requestMethod = methods.find(m => m.method === req.method)|| {
        method: req.method,
        hasBody: false,
        purpose: "No tiene un body, no hay una respuesta, metodo no encontrado"
    };
    requestMethod.purpose += requestMethod.hasBody ? " La peticion incluye un body." : " La peticion no incluye un body.";

    if(requestMethod.hasBody){
        req.body
        res.json({...req.body, ruta_consumida: req.route.path, ...requestMethod});
    }
    else {
        res.json({ruta_consumida: req.originalUrl, ...requestMethod});

    }
    
};

module.exports = mirrow;
