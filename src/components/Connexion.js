import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import {Alert} from "react-bootstrap";
import {useHistory} from "react-router";

const Connexion = (props) => {

    //Liste des hooks : là où fait l'appel à des fonctions
    const [identifiant, setIdentifiant] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [msg, setMsg] = useState("");
    const [boolRefresh, setBoolRefresh] = useState(true);

    let history = useHistory();
    useEffect(()=>{
        if(boolRefresh === true){
            console.log("ok")
            props.gereChangementSession("-1","-1","-1")
            setBoolRefresh(false)
        }
    },[props, boolRefresh]);




    const handleSubmit = e => {
        e.preventDefault(); //Cette instruction empeche la propagation de la chaîne d'évènements (interface du bouton, -> action handle -> puis submit)

        axios.post('authentication_token', { //les paramètres de l'appel axios
                login: identifiant, //la variable d'état "identifiant" mise à jour par son champ dédié
                password: motDePasse //la variable d'état "motDePasse" mise à jour par son champ dédié
            }
        )
            .then((response) => { //La connexion est ok
                setMsg(<Alert variant='success'> Identification réussie </Alert>)
                props.gereChangementSession(response.data.token, response.data.refresh_token, identifiant)
                history.push("/mesinfos")
            }, (error) => { //Il y a eu un pbm quelque part!
                switch (error.response.status) {
                    case 401 :
                        setMsg(<Alert variant='danger'> Identification non valide </Alert>)
                        break
                    default:
                        setMsg(<Alert variant='danger'> Erreur inconnue </Alert>)
                }

            });
    };

    //Ce qu'affiche cet objet
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
                <h3>Connexion</h3>
                <Table>
                    <tbody>
                    <tr>
                        <td>Identifiant</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Votre identifiant : mail"
                                name="identifiant"
                                value={identifiant}
                                onChange={e => {
                                    setIdentifiant(e.target.value)
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Mot de passe</td>
                        <td>
                            <input
                                type="password"
                                placeholder="Votre mot de passe"
                                name="password"
                                value={motDePasse}
                                onChange={e => {
                                    setMotDePasse(e.target.value)
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align='center'>
                            <button className="input-submit">Valider</button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
            {msg}
        </div>
    )
}
export default Connexion
