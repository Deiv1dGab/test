import connection from './conn.js';

export function createPro(nome, preco, quant, desc, categoria, callback) {
    connection.query('INSERT INTO Produto (nome, preco, quant, `desc`, categoria) VALUES (?, ?, ?, ?, ?)', [nome, preco, quant, desc, categoria], callback);
}

export function readPro(callback) {
    connection.query('SELECT * FROM Produto WHERE quant <> 0', callback);
}

export function readProById(id, callback) {
    connection.query('SELECT * FROM Produto WHERE idProduto = ?', [id], callback);
}

export function updatePro(id, nome, preco, quant, desc, categoria, callback) {
    connection.query('UPDATE Produto SET nome = ?, preco = ?, quant = ?, `desc` = ?, categoria = ? WHERE idProduto = ?', [nome, preco, quant, desc, categoria, id], callback);
}

export function deletePro(id, callback) {
    connection.query('UPDATE Produto SET quant = 0 WHERE idProduto = ?', [id], callback);
}

