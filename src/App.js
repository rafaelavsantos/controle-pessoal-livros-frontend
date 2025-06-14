import './App.css';
//import ConsultorioOdontologico from './components/ConsultorioOdontologico';
import MenuSuperior from "./components/MenuSuperior";
import InclusaoLivros from "./components/InclusaoLivros";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import ManutencaoLivros from './components/ManutencaoLivros';
import ResumoLivros from './components/ResumoLivros';

const App = () => {
  return (
    <>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<ResumoLivros />} />
        <Route path="/manutencao" element={<ManutencaoLivros />} />
        <Route path="/inclusao" element={<InclusaoLivros />} />
      </Routes>
    </>
  );
}

export default App;
