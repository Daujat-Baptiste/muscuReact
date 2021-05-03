import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";
import {Card} from "react-bootstrap";
import Commentaire from "./Commentaire";

const Atelier = (props) => { // pour l'instant on n'a pas besoin de propriétés
    const [titre, setTitre] = useState("")
    const [message, setMessage] = useState("")
    const [atelier, setAtelier] = useState({}) // variable d'état contenant l'atelier actuel
    const {id} = useParams() //Permet de récupérer la variable associée à l'id dans l'URL depuis la route

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`api/ateliers/${id}`) //Attention, cet apostrophe est celle de "alt gr" + 7. Elle permet à ${id} d'incruster sa valeur !
                .then((response) => {
                    setAtelier(response.data)
                }, (error) => {
                    console.log(error)
                });
        };
        fetchData();
    }, [id]);

    const handleAjoutCommentaire = e => {
        e.preventDefault();
        axios.post('commentaire/atelier/api/'+id,
            {
                titre: titre,
                message: message
            }
        )
            .then((response) => {
                atelier.commentaires.push(response.data)
                setAtelier(atelier)
                setTitre("")
                setMessage("")
            }, (error) => {
                console.log(error)
            })
    }
    const handleSupprimerCommentaire = idCommentaire => {
        axios.delete('api/commentaire_ateliers/'+idCommentaire)
            .then((response)=> {
                setAtelier(
                    {
                        ...atelier,
                        commentaires: atelier.commentaires.filter(
                            commentaire => {
                                return commentaire.id !== idCommentaire;
                            }
                        )
                    }
                )
            },(error)=> {
                console.log(error)
            });
    }

    if (atelier) {
        return (
            <div className="container">
                <h3>Atelier : {atelier.titre} </h3>
                <Table> {//table est un composant react bootstrap
                }
                    <tbody>
                    <tr>
                        <td>Description</td>
                        <td>{atelier.description}</td>
                    </tr>
                    <tr>
                        <td>Unité d'intensité</td>
                        <td>{atelier.unitedintensite}</td>
                    </tr>
                    <tr>
                        <td>Unité de performance</td>
                        <td>{atelier.unitedeperformance}</td>
                    </tr>
                    </tbody>
                </Table>
                <form onSubmit={handleAjoutCommentaire}>
                    <Card>
                        <Card.Header>Nouveau Commentaire</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <input type="text"
                                       placeholder="Titre de mon commmentaire"
                                       name="Titre"
                                       value={titre}
                                       onChange={e => {
                                           setTitre(e.target.value)
                                       }
                                       }
                                />
                            </Card.Title>
                            <Card.Text>
                                <textarea placeholder="Mon commentaire"
                                          name="Message"
                                          value={message}
                                          cols="50"
                                          rows="25"
                                          onChange={e => {
                                              setMessage(e.target.value)
                                          }}
                                />
                            </Card.Text>
                            <Card.Footer>
                                <button className="input-submit">Ajouter</button>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </form>
                <h3>Commentaires</h3>
                {atelier.commentaires === undefined ?
                    (
                        <>
                            Pas encore de commentaire
                        </>
                    ) :
                    (
                        <>
                            {atelier.commentaires.map(commentaire => (
                                <Commentaire key={commentaire.id} commentaire={commentaire} login={props.login}
                                             handleSupprimerCommentaire={handleSupprimerCommentaire}/>
                            ))}
                        </>
                    )
                }
            </div>
        )
    } else {
        return <div className="container">
            En chargement...
        </div>
    }

}
export default Atelier