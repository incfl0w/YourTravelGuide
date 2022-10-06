import {Card,Container,Row,Col,} from "react-bootstrap"
import PropTypes from 'prop-types'
import Image from "./CustomImage"
import "react-image-lightbox/style.css"
import React from "react"
import Link from "next/link"
import FilterPane from "./FilterPane"


CmsMedia.propTypes = {
  data: PropTypes.array, 
  path: PropTypes.string,
  title: PropTypes.string, 
  options: PropTypes.array
}
export default function CmsMedia({data, path, title, options}) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">    
      <section className="mb-5">
        <FilterPane 
        title={title}
        options={options}
        />
        {data && <Row>
          {data.map((item, index) => (
            <Col xs={6} md={4} lg={3} xl={2} key={index}>
              <Link href={`${path}${item.id}`} passHref>
              <Card className="position-relative mb-4" style={{cursor: 'pointer'}}>
                <Image
                  src={item.photo}
                  alt={item.name}
                  className="card-img-top"
                  layout="responsive"
                  width={600}
                  height={400}
                  sizes="(max-width: 530px) 50vw, (max-width: 992px) 33vw, (max-width: 1150px) 25vw, 17vw"
                />
                <Card.Body className="py-2 px-4">
                  <Card.Text className="text-muted text-sm">
                    {item.name}
                  </Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </Col>
            
          ))}
        </Row>}
      </section>
    </Container>
  )
}
