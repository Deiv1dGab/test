const express = require('express');
const app = express();
const port = 5500;
const conn = require('./conecta');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});
    
app.post('/submit', (req, res) => {
    const data = req.body.data;
    const inspetores = req.body.inspetores;
    const inspetores2 = req.body.inspetores2;
    const lt = req.body.lt;
    const estrutura = req.body.estrutura;
    const torre = req.body.torre;
    const concreto = req.body.concreto;
    const suspensao = req.body.sus;
    const ancoragem = req.body.anc;
    const secc = req.body.secc;
    const metalica = req.body.metalica;
    const dev_concreto = req.body.dev_concreto;
    const sky = req.body.sky;
    const item = req.body.item;
    const c = req.body.c;
    const desc = req.body.desc;

    res.send('Dados recebidos com sucesso!');

    const insert = 'INSERT INTO Formulário_inspeção (data_inspecao, inspetor, inspetor2, ltder, numero_estrutura, ) VALUES(?, ?, ?, ?, ?)'
    conn.query (sql, [data, inspetores, inspetores2, lt, estrutura], (error, results, fields) =>{
        if(error){
            console.log('Erro ao inserir os dados: '+ error.stack);
            res.status(500).send('Erro ao inserir os dados no banco de dados');
            return;
        }
        console.log('Dados inseridos com sucesso :). ID:', results.insertId);
        res.status(200).send('Dados enviados corretamente :)');
    });

    const insert2 = 'INSERT INTO tipo_estrutura (nome_estrutura) VALUES(?)'
    conn.query (sql, [torre], (error, results, fields) =>{
        if(error){
            console.log('Erro ao inserir os dados: '+ error.stack);
            res.status(500).send('Erro ao inserir os dados no banco de dados');
            return;
        }
        console.log('Dados inseridos com sucesso :). ID:', results.insertId);
        res.status(200).send('Dados enviados corretamente :)');
    });
});



//ROTA PARA ITENS 

app.get('/item', (req, res)=> {
    res.sendFile(__dirname + '/item.html');
});


app.listen(port, () => {
    console.log(`Servidor OK em http://localhost:${port}`);
});