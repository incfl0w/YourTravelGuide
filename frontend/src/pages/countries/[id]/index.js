import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import CountryService from '../../../services/countryService'
// import Header from '../../../components/header'

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap"

import Image from "../../../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faSkype,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"


import profile from "../../../data/profile.json"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import Messages from "../../../components/Messages"
import EditProfile from "../../../components/Forms/EditProfile"
import PageHeader from "../../../components/PageHeader"
import Breadcrumbs from "../../../components/Breadcrumbs"
import Avatar from "../../../components/Avatar"
import Description from '../../../components/Description'






export default function PostPage() {
  const countryService = new CountryService()
  const router = useRouter()
  const id = router.query.id
  // console.log(`ID:${id}`)
  const [country, setCountry] = useState({})
  
    
    useEffect(() => {
      const id = router.query.id
      if (id){
        countryService.getCountry(id)
      .then(data => setCountry(data))
      }
      
    }, [id]);
  
  

    return (
      <Container fluid className="px-lg-4 px-xl-5"> 
      <section>
        <Row>
          <Col lg={4}>
            <Card className="card-profile mb-4">
              <Card.Header
                className="overflow-hidden"
                style={{ backgroundImage: `url(${country.photo})` }}
              ></Card.Header>
              <Card.Body >
                <div
                  className="card-profile-img mx-auto d-flex align-center"
                  style={{ maxHeight: "8rem" }}
                >
                  <div className="position-relative overflow-hidden rounded-circle">
                    {country.photo && <Image
                      src={country.photo}
                      layout="fixed"
                      width={122}
                      height={122}
                      priority
                      alt={profile.name}
                    />}
                  </div>
                </div>

                <h3 className="mb-3 text-center">{country.name}</h3>
                <p className="mb-4"><b>Capital</b>: Kiev</p>
                <p className="mb-4"><b>Safety:</b> 3 of 5</p>
                <p className="mb-4"><b>Population:</b> 113131313</p>
                <p className="mb-4"><b>Currency:</b> USD</p>
                <p className="mb-4"><b>Languages:</b> English, Spanish</p>
                <p className="mb-4"><b>Weather:</b> Tropic</p>
                <p className="mb-4"><b>Understanding English:</b> Mostly yes</p>



                <Button variant="outline-dark" size="sm">
                  <FontAwesomeIcon icon={faTwitter} /> Follow
                </Button>
              </Card.Body>
            </Card>
            
            
          </Col>
          <Col lg={8}>
            {profile.messages && <Description profile={profile} country={country}/>}
            
          </Col>
        </Row>
      </section>
      
    </Container>
    )
  // return (
  //   <>
  //     {/* <Header /> */}
  //     <h1>Post: {id}</h1>
  //     <ul>
  //       <li>
  //         <Link href={`/post/${id}/first-comment`}>
  //           <a>{country.name}</a>
  //         </Link>
  //       </li>
  //       <li>
  //         <Link href={`/post/${id}/second-comment`}>
  //           <a>{country.description}</a>
  //         </Link>
  //       </li>
  //     </ul>
  //   </>
  // )
}