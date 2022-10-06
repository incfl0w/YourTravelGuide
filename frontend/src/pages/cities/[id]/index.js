import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import CityService from '../../../services/cityService'
import { Container} from "react-bootstrap"
import CityInfo from '../../../components/cityComponents/CityInfo'

export default function PostPage() {
  const cityService = new CityService()
  const router = useRouter()
  const id = router.query.id
  const [city, setCity] = useState({})
  
    
    useEffect(() => {
      const id = router.query.id
      if (id){
        cityService.getCity(id)
      .then(data => setCity(data))
      }
      
    }, [id]);
  
  

    return (
      <Container fluid className="px-lg-4 px-xl-5"> 
      <section>
        <CityInfo city={city}/>
      </section>
      
    </Container>
    )
}