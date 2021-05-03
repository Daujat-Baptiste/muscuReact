import React, {useState, useEffect} from "react"
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";

const Info = () => { // pour l'instant on n'a pas besoin de propriétés
    const [info, setInfo] = useState({}) // variable d'état contenant l'atelier actuel

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/getCurrentUser`  ) //Attention, cet apostrophe est celle de "alt gr" + 7. Elle permet à ${id} d'incruster sa valeur !
                .then((response) => {
                    console.log(response )
                    setInfo(response.data)
                }, (error) => {
                    console.log(error)
                });
        };
        fetchData();
    }, []);


    if (info) {
        return (
            <div className="container">
                <h3>Mes informations : </h3>
                <Table> {//table est un composant react bootstrap
                }
                    <tbody>
                    <tr>
                        <td>Identifiant</td>
                        <td>{info.login}</td>
                    </tr>
                    <tr>
                        <td>Nom</td>
                        <td>{info.nomUtilisateur}</td>
                    </tr>
                    <tr>
                        <td>Prénom</td>
                        <td>{info.prenomUtilisateur}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>{info.email}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return <div className="container">
            En chargement...
        </div>
    }

}
export default Info