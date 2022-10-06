import React from 'react'
import PropTypes from 'prop-types';
import CityDescription from './CityDescription'
import {Button,Card,Col,Row,} from "react-bootstrap"
import Image from "../CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, } from "@fortawesome/free-brands-svg-icons"

const CityInfo = ({city}) => {
    return (
         <Row>
            <Col lg={4}>
              <Card className="card-profile mb-4">
                <Card.Header
                  className="overflow-hidden"
                  style={{ backgroundImage: `url(${city.photo})` }}
                ></Card.Header>
                <Card.Body >
                  <div
                    className="card-profile-img mx-auto d-flex align-center"
                    style={{ maxHeight: "8rem" }}
                  >
                    <div className="position-relative overflow-hidden rounded-circle">
                      {city.photo && <Image
                        src={city.photo}
                        layout="fixed"
                        width={122}
                        height={122}
                        priority
                        alt={city.name}
                      />}
                    </div>
                  </div>
                  <h3 className="mb-3 text-center">{city.name}</h3>
                  <p className="mb-4"><b>Safety:</b> {city.safety}</p>
                  <p className="mb-4"><b>Population:</b> {city.population}</p>
                  <p className="mb-4"><b>Weather:</b> Tropic</p>
                  <p className="mb-4"><b>Understanding English:</b> {city.understanding_english}</p>
                  <Button variant="outline-dark" size="sm">
                    <FontAwesomeIcon icon={faTwitter} /> Follow
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              {<CityDescription city={city} />}
            </Col>
          </Row>
    );
}
CityInfo.propTypes = {
  city: PropTypes.object
}

export default CityInfo;

