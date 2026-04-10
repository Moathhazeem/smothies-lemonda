import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'
const SmoothieCard = ({ smoothie , onDelete }) => {
    const handleDelete = async () => {
        console.log('Delete smoothie:', smoothie.id)
        const { error , data } = await supabase.from('smoothies').delete().eq('id', smoothie.id)
        if (error) {
            console.error('Error deleting smoothie:', error)
        } 
        if (data) {
            console.log('Deleted smoothie:', data)
            onDelete(smoothie.id)
        }
    }
    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={`/update/${smoothie.id}`}>
                <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default SmoothieCard