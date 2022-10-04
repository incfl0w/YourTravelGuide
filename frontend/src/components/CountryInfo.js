
import React from 'react'
import PropTypes from 'prop-types';
import CountryDescription from './CountryDescription'
// import Header from '../../../components/header'
import {Button,Card,Col,Row,} from "react-bootstrap"
import Image from "./CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, } from "@fortawesome/free-brands-svg-icons"
import profile from "../data/profile.json"

const CountryInfo = ({country}) => {
    return (
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
                  <p className="mb-4"><b>Capital</b>: {country.capital.name}</p>
                  <p className="mb-4"><b>Safety:</b> {country.safety}</p>
                  <p className="mb-4"><b>Population:</b> {country.population}</p>
                  <p className="mb-4"><b>Currency:</b> {country.currencies.map(element => element.name).join(', ')}</p>
                  <p className="mb-4"><b>Languages:</b> {country.languages.map(element => `${element.name} `).join(', ')}</p>
                  <p className="mb-4"><b>Weather:</b> Tropic</p>
                  <p className="mb-4"><b>Understanding English:</b> {country.understanding_english}</p>

                  <Button variant="outline-dark" size="sm">
                    <FontAwesomeIcon icon={faTwitter} /> Follow
                  </Button>
                </Card.Body>
              </Card>
              
              
            </Col>
            <Col lg={8}>
              {profile.messages && <CountryDescription profile={profile} country={country}/>}
              
            </Col>
          </Row>
    );
}
CountryInfo.propTypes = {
  country: PropTypes.object
}

export default CountryInfo;

