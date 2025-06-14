import { useEffect, useState } from "react";
import { api } from "../axios/axios";
import Chart from "react-google-charts";

const ResumoLivros = () => {
  const [resumo, setResumo] = useState([]);
  const [grafico, setGrafico] = useState([]);

  const obterDados = async () => {
    try {
      const dadosResumo = await api.get("livros/dados/resumo");
      setResumo(dadosResumo.data);

      const dadosGrafico = await api.get("livros/dados/grafico");
      
      const arrayGrafico = [["Ano", "R$ Total"]];
      
      dadosGrafico.data.map((dado) => {
        arrayGrafico.push([dado.ano.toString(), dado.total]);
      });
      setGrafico(arrayGrafico);
    } catch (err) {
      alert(`[Erro] Não foi possível obter os dados: ${err}`);
    }
  };

  useEffect(() => {
    obterDados();
  }, []);

  return (
    <div className="container">
      <h4 className="mt-3">Dashboard</h4>
      <span className="btn btn-outline-primary btn-lg">
        <p className="badge bg-danger">{resumo.num}</p>
        <p>Livros Cadastrados</p>
      </span>
      <span className="btn btn-outline-primary btn-lg mx-2">
        <p className="badge bg-danger">{Number(resumo.soma).toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
        <p>Total Investido em Livros</p>
      </span>
      <span className="btn btn-outline-primary btn-lg me-2">
        <p className="badge bg-danger">{Number(resumo.maior).toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
        <p>Maior Preço Cadastrado</p>
      </span>
      <span className="btn btn-outline-primary btn-lg">
        <p className="badge bg-danger">{Number(resumo.media).toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
        <p>Preço Médio dos Livros</p>
      </span>

      <div className="d-flex justify-content-center">
        <Chart
          width={1000}
          height={420}
          chartType="ColumnChart"
          loader={<div>Carregando gráfico...</div>}
          data={grafico}
          options={{
            title: "Total de Investimentos em Livros - por Ano de Publicação",
            chartArea: { width: "50%"},
            hAxis: { title: "Ano de Publicação"},
            vAxis: { title: "Preço Acumulado R$"},
            legend: { position: "none"}
          }}
        />
      </div>
    </div>
  );
}

export default ResumoLivros;