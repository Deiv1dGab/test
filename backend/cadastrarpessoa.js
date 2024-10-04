import express, { json } from "express";
const app = express();
import cors from "cors";
import cadastrarPessoa from "./model/CadastroPessoa.js";
import connection from "./model/conn.js";

app.use(json());
app.use(cors());

app.post("/cadastrarPessoa", (req, res) => {
    const { nome, email, telefone, cpf, rg, nasc, est, escolar, endereco } = req.body;

//console.log("Dados recebidos:", nome, email, telefone, cpf, rg, nasc, est, escolar, endereco);

    const sql = "INSERT INTO Cidadao (nomeCidadao, emailCidadao, telefoneCidadao, cpfCidadao, rgCidadao, nascimentoCidadao, estadocivilCidadao, escolaridadeCidadao, enderecoCidadao) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ?)";

    connection.query(sql, [nome, email, telefone, cpf, rg, nasc, est, escolar, endereco], (error, results, fields) => {
        if(error){
            console.log('Erro ao inserir os dados: '+ error.stack);
            res.status(500).send('Erro ao inserir os dados no banco de dados');
            return;
        }
        console.log('Dados inseridos com sucesso :). ID:', results.insertId);
        res.status(200).send('Dados enviados corretamente :)');
    });
    });

app.get("/cadastrarPessoa")


app.listen(3000, () => {
    console.log('Servidor rodando com sucesso 3000');
});