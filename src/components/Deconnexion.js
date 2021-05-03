import { useHistory } from 'react-router-dom'

const Deconnexion = props => {

    let history = useHistory();
    const handleSubmitDeconnexion = e => {
        e.preventDefault(); //Cette instruction empeche la propagation de la chaîne d'évènements (interface du bouton, -> action handle -> puis submit)
        props.gereChangementSession("-1","-1","-1");
        history.push("/connexion");
    };

    const handleSubmitAnnuler = e => {
        e.preventDefault(); //Cette instruction empeche la propagation de la chaîne d'évènements (interface du bouton, -> action handle -> puis submit)
        history.push("/");
    };

    return (
        <div className="container">
            <h3>Confirmez-vous la déconnexion ?</h3>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form onSubmit={handleSubmitDeconnexion} className="form-container">
                            <button className="input-submit">Oui</button>
                        </form>
                    </td>
                    <td>
                        <form onSubmit={handleSubmitAnnuler} className="form-container">
                            <button className="input-submit">Non</button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Deconnexion