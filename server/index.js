import express from 'express';

import cors from 'cors';


//SDK DEL MERCADO PAGO 

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: 'aqui access toekn de mercado-pago',

});

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Soy el server:");

});

app.post('/create_preference', async (req, res) => {
    try {
        const { title, quantity, price, productId, orderId } = req.body;

        if (!productId || !orderId) {
            return res.status(400).json({ error: "Product ID and Order ID are required." });
        }

        const body = {
            items: [
                {
                    title: title,
                    quantity: Number(quantity),
                    unit_price: Number(price),
                    currency_id: "PEN",
                },
            ],
            back_urls: {
                success: `http://localhost:3001/views/view-detalles/${productId}?status=success&orderId=${orderId}`,
                failure: `http://localhost:3001/views/view-detalles/${productId}?status=failure`,
                pending: `http://localhost:3001/views/view-detalles/${productId}?status=pending`,
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :(",
        });
    }
});

app.listen(port, () => {

    console.log(`El servidor esta corriendo en el puerto ${port}`);

}); 