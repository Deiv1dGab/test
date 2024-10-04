import { createPro, readPro, readProById, updatePro, deletePro, createImages, readImagesByProductId, deleteImagesByProductId } from './model/produto.js';

export async function createProduto(req, res) {
    const { nome, preco, quant, desc, categoria, imagens } = req.body;
    createPro(nome, preco, quant, desc, categoria, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
            console.log("Deu tudo errado");
            return;
        }
        const produtoId = result.insertId;
        if (imagens && imagens.length > 0) {
            createImages(produtoId, imagens, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ mensagem: 'Produto e imagens adicionados com sucesso' });
                console.log("Deu tudo certo");
            });
        } else {
            res.status(201).json({ mensagem: 'Produto adicionado com sucesso' });
            console.log("Deu certo");
        }
    });
}

export async function getProdutos(req, res) {
    readPro((err, produtos) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const produtosComImagens = produtos.map(produto => {
            return new Promise((resolve, reject) => {
                readImagesByProductId(produto.idProduto, (err, imagens) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ ...produto, imagens });
                    }
                });
            });
        });

        Promise.all(produtosComImagens)
            .then(resultados => res.json(resultados))
            .catch(error => res.status(500).json({ error: error.message }));
    });
}

export async function getProdutoById(req, res) {
    const { id } = req.params;
    readProById(id, (err, produtos) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (produtos.length === 0) {
            res.status(404).json({ error: "Produto não encontrado" });
            return;
        }
        const produto = produtos[0];
        readImagesByProductId(produto.idProduto, (err, imagens) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ ...produto, imagens });
        });
    });
}

export async function updateProduto(req, res) {
    const { id } = req.params;
    const { nome, preco, quant, desc, categoria, imagens } = req.body;
    console.log("Atualizando ID:", id, "com dados:", req.body);

    updatePro(id, nome, preco, quant, desc, categoria, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (imagens && imagens.length > 0) {
            deleteImagesByProductId(id, (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    console.log(err);

                    return;
                }
                createImages(id, imagens, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        console.log(err);
                        return;
                    }
                    res.send('Produto e imagens atualizados com sucesso');
                });
            });
        } else {
            res.send('Produto atualizado com sucesso');
        }
    });
}

export async function deleteProduto(req, res) {
    const { id } = req.params;
    console.log('Delete recebido do frontend: ', { id });
    deletePro(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
            return;
        }
        res.send('Produto excluído com sucesso');
    });
}
