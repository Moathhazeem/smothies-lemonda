import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
//compontes card
import SmoothieCard from "../componentes/SmoothieCard"
const Home = () => {
  const location = useLocation()
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const handleDelete = (id) =>{
    setSmoothies(preSmoothies=>{
      return preSmoothies.filter(smoothie => smoothie.id !== id)
    })
  }
  useEffect(() => {
    console.log('Fetching smoothies...', location)
    const fetchSmoothies = async () => {
      const {data,error }= await supabase.from('smoothies').select().order(orderBy, {ascending: false})
      if(error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if(data) {
        console.log('Data received:', data)
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [location, orderBy])
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="Smoothies">
          <div className="order-by">
            <p>Order by:</p>
          <button onClick={() => setOrderBy('created_at')}>Created at</button>
          <button onClick={() => setOrderBy('title')}>Title</button>
          <button onClick={() => setOrderBy('rating')}>Rating</button>
      {orderBy === 'created_at' && <p>Ordering by created at</p>}
      {orderBy === 'title' && <p>Ordering by title</p>}
      {orderBy === 'rating' && <p>Ordering by rating</p>}
        </div>
        <div className="smoothies-grid">{smoothies.map(smoothie =>(
        <SmoothieCard
        key={smoothie.id}
        smoothie={smoothie}
        onDelete={handleDelete}
        />
      ))}</div>
      </div>
      )}
    </div>
  )
}

export default Home