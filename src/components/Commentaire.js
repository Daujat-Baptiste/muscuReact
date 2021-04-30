import React, {useEffect, useState} from "react"
import Moment from 'moment'
import axios from "./AxiosInterceptor";
import Card from "react-bootstrap/Card";

const Commentaire = ({commentaire, login, handleSupprimerCommentaire}) => { //au lieu de passer par un propriété, on met les 2 paramètres  dans 2 variables (merci les {})

    const [commentaires, setCommentaires] = useState([])
    const [proprietaires, setProprietaires] = useState([])
    useEffect(() => {
        const getCommentaire = async()=>{
            const commentaireFetched = await axios.get(commentaire)
            setCommentaires(commentaireFetched.data)
            const proprietaireFetched = await axios.get("http://127.0.0.1:8000"+commentaireFetched.data.proprietaire)
            setProprietaires(proprietaireFetched.data)
        }
        getCommentaire()
    }, [])
    console.log(commentaires)
    return (
        <Card>
            <Card.Header>De <i>
                {proprietaires === null ?
                    (<> anonyme </>)
                    : (<> {proprietaires.nomUtilisateur} {proprietaires.prenomUtilisateur} </>)}
            </i> le {Moment(commentaires.date).format('DD/MM/YYYY à HH:mm')}

                {commentaires.proprietaire === null ?
                    (<>  </>)
                    : (<> {commentaires.proprietaire === login ?
                        (
                            <>
                                <button
                                    className="input-submit">
                                    onClick={e => {
                                    handleSupprimerCommentaire(commentaire.id)
                                }}
                                </button>
                            </>
                        ) : (<></>)
                    }
                    </>)}
            </Card.Header>
            <Card.Body>
                <Card.Title> {commentaires.titre} </Card.Title>
                <Card.Text>
                    {commentaires.message}
                </Card.Text>
            </Card.Body>
        </Card>

    )
}
export default Commentaire