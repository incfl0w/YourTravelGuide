import React from "react"
import { faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap"
import Avatar from "./Avatar"
export default function Description({profile, city}) {
  return (
    <Card className="overflow-hidden mb-4">
      <Card.Header>
      <h5 className="fw-bold">More about {city.name}</h5>
      </Card.Header>
      <div
            className="border-start-0 border-end-0 py-5 border-top-0"
            
          >
            <div className="d-flex">
              <div className="flex-shrink-0">
                
              </div>
              <div className="flex-grow-1 ps-3">
                
                
                <div className="text-muted text-sm">{city.description}</div>
                
              </div>
            </div>
          </div>
      <ListGroup className="rounded-0">
        
      </ListGroup>
    </Card>
  )
}
