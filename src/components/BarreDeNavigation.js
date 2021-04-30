import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";

const BarreDeNavigation = props => {

    let nav;
    if(props.login === "" || props.login === "-1"){
        nav = <Navbar.Brand as={Link} to="/connexion">Connexion</Navbar.Brand>
    } else {
        nav =
            <>
                <Navbar.Brand as={Link} to="/mesinfos">Mes informations</Navbar.Brand>
                <Navbar.Brand as={Link} to="/deconnexion">Déconnexion</Navbar.Brand>
                <Navbar.Text>Connecté : {props.login}</Navbar.Text>
            </>
    }
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Ma salle de Muscu</Navbar.Brand>
            <Navbar.Brand as={Link} to="/About">A propos</Navbar.Brand>
            <Navbar.Brand as={Link} to="/atelier">Nos ateliers</Navbar.Brand>
            <Navbar.Brand as={Link} to="/boisson">Nos boissons</Navbar.Brand>
            {nav}
        </Navbar>
    )
}
export default BarreDeNavigation