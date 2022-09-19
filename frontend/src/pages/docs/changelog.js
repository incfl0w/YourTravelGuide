import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Badge, Card, Col, Container, Row } from "react-bootstrap"
export async function getStaticProps() {
  return {
    props: {
      title: "Changelog",
    },
  }
}
export default function credits(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        pages={[{ name: "Docs", link: "/docs/introduction" }]}
        title={props.title}
      />
      <PageHeader title={props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2021-08-26
                </Badge>
                <h4 className="card-heading">Version 1.1</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">
                  - <strong>New:</strong> 5 E-commerce pages
                  <br />- <strong>New:</strong> 2 Knowledge base pages
                  <br />- <strong>New:</strong> ContactCard, PublishBlock &
                  SupportBlock components
                  <br />- <strong>Improved:</strong> Added light card table
                  header (theme/_card.scss)
                  <br />- <strong>Improved:</strong> Added avatar flag, avatar
                  text, avatar xxs (src/scss/theme/_avatar.scss &
                  src/components/Avatar.js) <br />- <strong>Updated:</strong>{" "}
                  Updated dependencies (next 11.1.0, react-bootstrap
                  2.0.0-beta.4, simple-datatables 3.1.2, react-imask 6.1.0,
                  react-leaflet 3.1.2, react-image-lightbox 5.1.4,
                  @fortawesome/react-fontawesome 0.1.15, chart.js 3.5.1, sass
                  1.38.0)
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2021-07-13
                </Badge>
                <h4 className="card-heading">Version 1.0</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">Initial release</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
