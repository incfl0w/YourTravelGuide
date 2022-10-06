import React from "react"
import PropTypes from 'prop-types';
import { Card, ListGroup } from "react-bootstrap"
export default function CountryDescription({ country }) {
  return (
    <Card className="overflow-hidden mb-4">
      <Card.Header>
        <h5 className="fw-bold">More about {country.name}</h5>
      </Card.Header>
      <div
        className="border-start-0 border-end-0 py-5 border-top-0">
        <div className="d-flex">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-grow-1 ps-3">
            <div className="text-muted text-sm">{country.description}</div>
          </div>
        </div>
      </div>
      <ListGroup className="rounded-0">
      </ListGroup>
    </Card>
  )
}

CountryDescription.propTypes = {
  country: PropTypes.object
}
