import React, {useState, useEffect} from "react"

import DetailBoisson from "./DetailBoisson";
import axios from "./AxiosInterceptor";


const ListeBoisson = props => {
    const [boissons, setBoissons] = useState([]) //déclare une variable d'état appelée "ateliers". On change sa valeur en appelant la méthode setAteliers

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('api/boissons') //get : car on fait un appel en get,  'api/ateliers' est l'URI appelée donnant la liste des ateliers
                .then((response) => {
                    console.log(response)
                    setBoissons(response.data) // on attribue à la "ateliers" les response.data
                }, (error) => {
                    console.log(error) //Affichage dans la console de log d'une éventuelle erreur
                });
        };
        fetchData(); // appel de la méthode créée ci dessus !
    }, [])
    return (
        <div className="container">
            <h1>Nos Boissons</h1>
            <ul>
                {boissons.map(boissonAct => (
                    <DetailBoisson key={boissonAct.id} boisson={boissonAct}/>
                ))}
            </ul>
        </div>
    )
}
export default ListeBoisson