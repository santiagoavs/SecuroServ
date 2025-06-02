import '../styles/Header.css';
import SecuroLogo from '/assets/securo-logo.png'
import HeaderCar from '/assets/header-car.png'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <div className="overlay">
        <img src={SecuroLogo} alt="SecuroServ Logo" className="logo" />
        <div className="header-icons">
          <Link to="/contact">
            <img src="/assets/contact.png" alt="contact" />
          </Link>
          <Link to="/aboutus">
            <img src="/assets/about-us.png" alt="aboutus" />
          </Link>
          <Link to="/terms">
            <img src="/assets/terms.png" alt="terms" />
          </Link>
</div>

        <button className="filter-button">Filtrar por precio</button>
      </div>
      <img src={HeaderCar} alt="Car" className="header-car" />
    </header>
  );
}

export default Header;
