import React, {useState, useEffect} from "react"

import DetailAtelier from "./DetailAtelier";
import axios from "./AxiosInterceptor";


const ListeAtelier = props => {
    const [ateliers, setAteliers] = useState([]) //déclare une variable d'état appelée "ateliers". On change sa valeur en appelant la méthode setAteliers

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('api/ateliers') //get : car on fait un appel en get,  'api/ateliers' est l'URI appelée donnant la liste des ateliers
                .then((response) => {
                    console.log(response)
                    setAteliers(response.data) // on attribue à la "ateliers" les response.data
                }, (error) => {
                    console.log(error) //Affichage dans la console de log d'une éventuelle erreur
                });
        };
        fetchData(); // appel de la méthode créée ci dessus !
    }, [])
    return (
        <div className="container">
            <h1>Nos Ateliers</h1>
            <ul>
                {ateliers.map(atelierAct => (
                    <DetailAtelier key={atelierAct.id} atelier={atelierAct}/>
                ))}
            </ul>
        </div>
    )
}
export default ListeAtelier