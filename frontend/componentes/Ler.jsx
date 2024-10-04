import React, { useEffect, useState } from "react";
import "../App.css";

function Read() {
    const [produtos, setProdutos] = useState([]);


        const fetchProdutos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/produto`);
                const data = await response.json();
                setProdutos(data);
                console.log(data);
            } catch (err) {
                console.error("Erro ao buscar produtos", err);
            }
        }; 


    useEffect(() => {
        fetchProdutos();
    }, []);
    return (
        <div>
            <h1>Lista de Produtos disponíveis</h1>
            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                produtos.map(produto => (
                    <div key={produto.idProduto} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <h2>{produto.nome}</h2>
                        <p>ID: {produto.idProduto}</p>
                        <p>Preço: {produto.preco}</p>
                        <p>Quantidade: {produto.quant}</p>
                        <p>Descrição: {produto.desc}</p>
                        <p>Categoria: {produto.categoria}</p>
                        {produto.imagens && produto.imagens.map((imagem, index) => (
                            <img key={index} src={imagem.imagensUrl} alt={`Imagem ${index + 1}`} style={{ maxWidth: '200px', marginTop: '10px' }} />
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default Read;
