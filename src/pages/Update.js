
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import supabase from '../config/supabaseClient'
const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [smoothie, setSmoothie] = useState(null)
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null)
  
  useEffect(() => {
    const fetchSmoothie = async() => {
      const {data, error} = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()
      
      if (error) {
        navigate('/',{replace:true})
      }
      if(data){
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        setSmoothie(data)
        console.log(data)
      }
    }
    
    fetchSmoothie()
  }, [id, navigate])
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('Form submitted')
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields')
      return  
    }
    console.log('Updating smoothie:', {title, method, rating, id})
    const {data , error} = await supabase.from('smoothies').update({title, method, rating}).eq('id', id).select();
    console.log('Response:', {data, error})
    if(error){
      console.log('Update error:', error)
      setFormError(error.message || 'Error updating smoothie')
      return
    }
    if(data){
      console.log('Update success:', data)
      setFormError(null)
      navigate('/')
    }
  }
  return (
    <div className="page update">
      <h2>Update - {id}</h2>
      {smoothie && (
        <form onSubmit={handleSubmit}>
        <label htmlFor = "title">Title:</label>
          <input type = "text" id ="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor = "method">Method:</label>
          <textarea id ="method" value={method} onChange={(e) => setMethod(e.target.value)}/>
        <label htmlFor = "rating">Rating:</label>
          <input type = "number" id ="rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
          <button type="submit">Update Smoothie Recipe</button>
          {formError && <p className="error">{formError}</p>}
      
        </form>
      )}
    </div>
  )
}

export default Update