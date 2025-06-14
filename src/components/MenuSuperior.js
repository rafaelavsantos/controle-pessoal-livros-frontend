import { Link } from "react-router-dom";

const MenuSuperior = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand" href="#">
                    Controle Pessoal de Livros
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/inclusao" className="nav-link" href="#">Inclusão</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/manutencao" className="nav-link" href="#">Manutenção</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/" className="nav-link" href="#">Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MenuSuperior;