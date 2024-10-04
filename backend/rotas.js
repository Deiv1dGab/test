import express, { json } from "express";
const app = express();
import cors from "cors";
const port = 3000;
import { getProdutos, createProduto, updateProduto, deleteProduto, getProdutoById } from "./controller.js";

app.use(json());
app.use(cors());

app.get('/produto', getProdutos);
app.get('/produto/:id', getProdutoById);
app.post('/produto', createProduto);
app.put('/produto/:id', updateProduto);
app.delete('/produto/:id', deleteProduto);

app.listen(port, () => {
    console.log(`Servidor OK em http://localhost:${port}`);
});
