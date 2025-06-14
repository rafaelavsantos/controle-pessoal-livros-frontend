import { useEffect, useState } from "react";
import { api } from "../axios/axios";
import ItemLista from "./ItemLista";
import { useForm } from "react-hook-form";

const ManutencaoLivros = () => {
    const [livros, setLivros] = useState([]);
    const {register, handleSubmit, reset} = useForm();

    const obterLista = async () => {
        try {
            const listagemLivros = await api.get("livros");
            setLivros(listagemLivros.data);
        } catch (err) {
            alert(`[ERRO] Não foi possível obter os dados: ${err}`);
        }
    };

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`livros/filtro/${campos.palavra}`);
            lista.data.length ? setLivros(lista.data) : alert("Não há livros com a palavra-chave pesquisada!");
        } catch(err) {
            alert(`[Erro] Não foi possível obter os dados: ${err}`);
        }
    };

    const excluir = async (id, titulo) => {
        if(!window.confirm(`Confirma a exclusão do livro "${titulo}"`)) {
            return;
        }
        try {
            await api.delete(`livros/${id}`);
            setLivros(livros.filter((livro) => livro.id !== id));
        } catch(err) {
            alert(`[Erro] Não foi possível excluir este livro: ${err}`);
        }

    };

    const editar = async (id, titulo, index) => {
        const novoPreco = Number(prompt(`Informe o novo preço do livro "${titulo}"`));

        if(isNaN(novoPreco) || novoPreco === 0) {
            return;
        }

        try {
            await api.put(`livros/${id}`, {preco: novoPreco});
            const livroAlterado = [...livros];
            livroAlterado[index].preco = novoPreco;
            setLivros(livroAlterado);
        } catch(err) {
            alert(`[Erro] Não foi possível editar o preço deste livro: ${err}`);
        }

    };

    useEffect(() => {
        obterLista();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção</h4>
                </div>

                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" required placeholder="Título ou autor" {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => {
                                reset({palavra: ""});
                                obterLista();
                            }} />
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ano</th>
                        <th>Preço R$</th>
                        <th>Foto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <ItemLista key={livro.id} id={livro.id} titulo={livro.titulo} autor={livro.autor} ano={livro.ano} preco={livro.preco} foto={livro.foto} excluirLivro={() => excluir(livro.id, livro.titulo)} editarLivro={() => editar(livro.id, livro.titulo, index)} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManutencaoLivros;