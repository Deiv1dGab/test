import React, { useState, useEffect } from "react";

function Update({ initialProductId = null, redirectToHome }) {
    const [productId, setProductId] = useState(initialProductId);
    const [showOptions, setShowOptions] = useState(false);
    const [formValores, setFormValores] = useState({
        nome: '',
        preco: '',
        quant: '',
        desc: '',
        categoria: '',
        imagens: [],
    });

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const resetForm = () => {
        setFormValores({
            nome: '',
            preco: '',
            quant: '',
            desc: '',
            categoria: '',
            imagens: [],
        });
    };

    useEffect(() => {
        if (productId) {
            const fetchProduto = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/produto/${productId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormValores({
                            nome: data.nome,
                            preco: data.preco,
                            quant: data.quant,
                            desc: data.desc,
                            categoria: data.categoria,
                            imagens: data.imagens.map(img => img.imagensUrl),
                        });
                    } else {
                        // Limpar os campos se o produto não for encontrado
                        resetForm();
                    }
                } catch (err) {
                    console.error("Erro ao buscar produto", err);
                    resetForm();
                }
            };
            fetchProduto();
        } else {
            resetForm();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValores(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (index, e) => {
        const newImages = [...formValores.imagens];
        newImages[index] = e.target.value;
        setFormValores(prevState => ({
            ...prevState,
            imagens: newImages
        }));
    };

    const addImageField = () => {
        setFormValores(prevState => ({
            ...prevState,
            imagens: [...prevState.imagens, '']
        }));
    };

    const handleSubmit = async (e) => {
        try {
            const formData = {
                ...formValores,
                imagens: formValores.imagens.filter(url => url.trim() !== '')  // Filtrar URLs vazias
            };

            console.log("Dados a serem enviados: ", formData);
            const response = await fetch(`http://localhost:3000/produto/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const json = await response.json();
            console.log(response);
            console.log(json);
            alert("Produto atualizado com sucesso");
            window.location.reload()
        } catch (err) {
            console.error("Erro ao enviar", err);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/produto/${productId}`, {
                method: 'DELETE',
            });
            alert("Produto apagado com sucesso");
            window.location.reload()
        } catch (err) {
            console.error("Erro ao excluir", err);
        }
    };

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <div>
            Procurar:
            <input type="number" value={productId || ''} onChange={handleIdChange} placeholder="Digite o ID do produto" />
            <br />
            <form onSubmit={handleSubmit}>
                Nome:
                <input type="text" name='nome' value={formValores.nome} onChange={handleChange} />
                <br />
                Preço:
                <input type="number" name='preco' value={formValores.preco} onChange={handleChange} />
                <br />
                Quantidade:
                <input type="number" name='quant' value={formValores.quant} onChange={handleChange} />
                <br />
                <label>Descrição</label>
                <br />
                <textarea rows={5} cols={50} name='desc' value={formValores.desc} onChange={handleChange} />
                <br />

                <p className="cat" onClick={handleToggleOptions}>
                Categorias
                </p>
                {showOptions && (
                <div>
                    Jogos: <input type="radio" name='categoria' value='Jogos' checked={formValores.categoria === 'Jogos'} onChange={handleChange} />
                    Geek: <input type="radio" name='categoria' value='Geek' checked={formValores.categoria === 'Geek'} onChange={handleChange} />
                    Cosplay: <input type="radio" name='categoria' value='Cosplay' checked={formValores.categoria === 'Cosplay'} onChange={handleChange} />
                </div>
                )}
                <br />

                Imagens:
                {formValores.imagens.map((imagem, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name={`imagem${index}`}
                            value={imagem}
                            onChange={(e) => handleImageChange(index, e)}
                        />
                        <br />
                        {imagem && <img src={imagem} alt={`Imagem ${index + 1}`} style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    </div>
                ))}
                <button type="button" onClick={addImageField}>Adicionar Imagem</button>
                <br />
                <button type='submit'>Atualizar</button> <span></span>
                <button type='button' onClick={handleDelete}>Excluir</button>
            </form>
        </div>
    );
}

export default Update;
