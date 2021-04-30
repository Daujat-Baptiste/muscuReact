import {Link} from "react-router-dom";

const DetailAtelier  =(props)=>{
    return (
        <li>
            <Link to={`/atelier/${props.atelier.id}`}>
                <img src={`http://127.0.0.1:8000/image/${props.atelier.image}`} alt={props.atelier.titre} width="30" height="30"/>{props.atelier.titre}
            </Link>
        </li>
    )
}
export default DetailAtelier