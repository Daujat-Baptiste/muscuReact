import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";
import {Card} from "react-bootstrap";
import Commentaire from "./Commentaire";

const Boisson = (props) => { // pour l'instant on n'a pas besoin de propriétés
    const [titre, setTitre] = useState("")
    const [message, setMessage] = useState("")
    const [boisson, setBoisson] = useState({}) // variable d'état contenant l'atelier actuel
    const {id} = useParams() //Permet de récupérer la variable associée à l'id dans l'URL depuis la route

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`api/boissons/${id}`) //Attention, cet apostrophe est celle de "alt gr" + 7. Elle permet à ${id} d'incruster sa valeur !
                .then((response) => {
                    setBoisson(response.data)
                }, (error) => {
                    console.log(error)
                });
        };
        fetchData();
    }, [id]);

    const handleAjoutCommentaire = e => {
        e.preventDefault();
        axios.post(`/commentaire/boisson/api/${id}`,
            {
                titre: titre,
                message: message
            }
        )
            .then((response) => {
                boisson.commentaireBoissons.push(response.data)
                setBoisson(boisson)
                setTitre("")
                setMessage("")
            }, (error) => {
                console.log(error)
            })
    }

    const handleSupprimerCommentaire = idCommentaire => {
        axios.delete(`api/commentaire_boissons/${idCommentaire}`)
            .then((response)=> {
                setBoisson(
                    {
                        ...boisson,
                        commentaireBoissons: boisson.commentaireBoissons.filter(
                            commentaireBoissons => {
                                return commentaireBoissons.id !== idCommentaire;
                            }
                        )
                    }
                )
            },(error)=> {
                console.log(error)
            });
    }

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
                {boisson.commentaireBoissons === undefined ?
                    (
                        <>
                            Pas encore de commentaire
                        </>
                    ) :
                    (
                        <>
                            {boisson.commentaireBoissons.map(commentaireBoissons => (
                                <Commentaire key={commentaireBoissons.id} commentaire={commentaireBoissons} login={props.login}
                                             handleSupprimerCommentaire={()=>handleSupprimerCommentaire(commentaireBoissons.id)}/>
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
export default Boisson