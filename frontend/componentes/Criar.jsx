import { useState } from "react";
import "../App.css";

function Create({redirectToHome}) {
    const [showOptions, setShowOptions] = useState(false);
    const [formValores, setFormValores] = useState({
        nome: '',
        preco: '',
        quant: '',
        desc: '',
        categoria: '',
        imagens: [''],
    });

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

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
        e.preventDefault();
        try {
          const formData = {
            ...formValores,
            imagens: formValores.imagens.filter(url => url.trim() !== '')  // Filtrar URLs vazias
        };
            console.log("Dados a serem enviados: ", formValores);
            const response = await fetch(`http://localhost:3000/produto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValores)
            });
            const json = await response.json();
            console.log(response);
            console.log(json);
            alert("Produto cadastrado com sucesso");
            window.location.reload();
        } catch (err) {
            console.error("Erro ao enviar", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            Nome: <br />
            <input type="text" name='nome' value={formValores.nome} onChange={handleChange} required />
            <br />
            Preço: <br />
            <input type="number" name='preco' value={formValores.preco} onChange={handleChange} required />
            <br />
            Quantidade: <br />
            <input type="number" name='quant' value={formValores.quant} onChange={handleChange} required/>
            <br />
            Descrição: <br />
            <textarea rows={5} cols={50} name='desc' value={formValores.desc} onChange={handleChange} required/>
            <br />

            <p className="cat" onClick={handleToggleOptions}>
                Categorias
            </p>
            {showOptions && (
                <div>
                    Jogos: <input type="radio" name='categoria' value='Jogos' onChange={handleChange}  />
                    Geek: <input type="radio" name='categoria' value='Geek' onChange={handleChange} />
                    Cosplay: <input type="radio" name='categoria' value='Cosplay' onChange={handleChange} />
                </div>
            )}
            <br />

            Imagens:
            {formValores.imagens.map((imagem, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name={`imagem${index}`}
                        required
                        value={imagem}
                        onChange={(e) => handleImageChange(index, e)}
                    />
                    <br />
                    {imagem && <img src={imagem} alt={`Imagem ${index + 1}`} style={{ maxWidth: '200px', marginTop: '10px' }} />}
                </div>
            ))}
            <button type="button" onClick={addImageField}>Adicionar Imagem</button>
            <br />

            <button type='submit'>Cadastrar</button>
        </form>
    );
}

export default Create;
