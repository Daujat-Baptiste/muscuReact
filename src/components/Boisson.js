import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";

const Boisson = () => { // pour l'instant on n'a pas besoin de propriétés
    const [boisson, setBoisson] = useState({}) // variable d'état contenant l'atelier actuel
    const {id} = useParams() //Permet de récupérer la variable associée à l'id dans l'URL depuis la route

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`api/boissons/${id}`  ) //Attention, cet apostrophe est celle de "alt gr" + 7. Elle permet à ${id} d'incruster sa valeur !
                .then((response) => {
                    console.log(response )
                    setBoisson(response.data)
                }, (error) => {
                    console.log(error)
                });
        };
        fetchData();
    }, [id]);


    if (boisson) {
        return (
            <div className="container">
                <h3>Boisson : {boisson.titre} </h3>
                <Table> {//table est un composant react bootstrap
                }
                    <tbody>
                    <tr>
                        <td>Description</td>
                        <td>{boisson.description}</td>
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
export default Boisson