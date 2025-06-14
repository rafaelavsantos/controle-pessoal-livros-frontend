import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../axios/axios";

const InclusaoLivros = () => {
    // register serve pra definir os nomes dos campos do form (e validações)
    // handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
    // reset, para atribuir um valor para os campos registrados (para limpar o form)
    const { register, handleSubmit, reset } = useForm();

    const [aviso, setAviso] = useState("");

    // obtenção do conteúdo dos campos e envio dos dados
    // método chamado ao enviar o form (onSubmit)
    const salvar = async (campos) => {
        // JSON.stringify() converte um objeto JS para uma String JSON
        // alert(JSON.stringify(campos));
        try {
            const response = await api.post("livros", campos);

            setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
        } catch (err) {
            setAviso(`[ERRO] Livro não cadastrado: ${err}`);
        }

        // setTimeout: executa o comando após o tempo indicado (em milisegundos)
        setTimeout(() => {
            setAviso("");
        }, 5000);

        // limpa os campos de formulário para uma nova inclusão
        reset({ titulo: "", autor: "", foto: "", ano: "", preco: "" });

    };

    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input type="text" className="form-control" id="titulo" required autoFocus {...register("titulo")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="autor">Autor:</label>
                    <input type="text" className="form-control" id="autor" required {...register("autor")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="foto">URL da Foto:</label>
                    <input type="text" className="form-control" id="foto" required {...register("foto")} />
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Publicação:</label>
                            <input type="number" className="form-control" id="ano" required {...register("ano")} />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label htmlFor="preco">Preço R$:</label>
                            <input type="number" className="form-control" id="preco" step="0.01" required {...register("preco")} />
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-3 me-3" value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3" value="Limpar" />
            </form>
            <div className={aviso.startsWith("Ok!") ? "alert alert-sucsess" : aviso.startsWith("Erro") ? "alert alert-danger" : ""}>{aviso}</div>
        </div>
    );
}

export default InclusaoLivros;