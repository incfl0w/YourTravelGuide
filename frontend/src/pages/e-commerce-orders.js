import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { Card, Container, Table, Badge, Form, Button } from "react-bootstrap"
import { DataTable } from "simple-datatables"
import Breadcrumbs from "../components/Breadcrumbs"
import Stars from "../components/Stars"
import data from "../data/tables-datatable.json"
export async function getStaticProps() {
  return {
    props: {
      title: "Orders",
    },
  }
}
export default function eCommerceOrders(props) {
  const [tableLoaded, setTableLoaded] = useState(false)
  const dataTableRef = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const adjustTableColumns = (dataTable) => {
    let columns = dataTable.columns()

    if (window.innerWidth > 900) {
      columns.show([1, 3, 4, 5])
    } else if (window.innerWidth > 600) {
      columns.hide([4, 5])
      columns.show([1, 3])
    } else {
      columns.hide([1, 3, 4, 5])
    }
  }
  const bootstrapizeHeader = (dataTable) => {
    const tableWrapper = dataTable.table.closest(".dataTable-wrapper")
    const select = document.querySelector("#categoryBulkAction")
    const header = tableWrapper.querySelector(
      ".dataTable-top .dataTable-dropdown"
    )
    header.prepend(select)
    const input = tableWrapper.querySelector(".dataTable-input")
    if (input) {
      input.classList.add("form-control", "form-control-sm")
    }

    const dataTableSelect = tableWrapper.querySelector(".dataTable-selector")
    if (dataTableSelect) {
      dataTableSelect.classList.add("form-select", "form-select-sm")
    }

    const dataTableContainer = tableWrapper.querySelector(
      ".dataTable-container"
    )
    if (dataTableContainer) {
      dataTableContainer.classList.add("border-0")
    }
  }

  const NameLink = (dataTable) => {
    const tableWrapper = dataTable.table.closest(".dataTable-wrapper")
    // Make name Nextjs link
    const nameColumn = tableWrapper.querySelectorAll(
      "tbody tr td:nth-child(2) a"
    )
    if (nameColumn) {
      nameColumn.forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault()
          router.push(this.getAttribute("href"))
        })
      })
    }
  }

  // Init datatable
  useEffect(() => {
    // Client loaded
    setLoaded(true)

    if (loaded) {
      const dataTable = new DataTable(dataTableRef.current, {
        columns: [
          // Disable sorting on the first column
          { select: [0], sortable: false },
        ],
      })
      adjustTableColumns(dataTable)

      window.addEventListener("resize", () => adjustTableColumns(dataTable))

      dataTable.on("datatable.init", function () {
        bootstrapizeHeader(dataTable)
        NameLink(dataTable)
        setTableLoaded(true)
        tableLoaded && console.log(dataTable)
      })

      dataTable.on("datatable.page", function () {
        NameLink(dataTable)
      })
    }
  }, [loaded])

  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-heading">{props.title}</h1>
          <ul className="list-inline text-sm">
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faUpload} className="me-2" />
                Import
              </a>
            </li>
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faDownload} className="me-2" /> Export
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Card className="card-table mb-4">
        <Card.Body>
          <div className={`preload-wrapper ${tableLoaded ? "opacity-10" : ""}`}>
            <div className="table-responsive">
              <Table hover className="mb-0" ref={dataTableRef}>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    // Only for demo purposes - use real dates on production
                    const month =
                      loaded &&
                      Math.floor(Math.random() * 12 + 1)
                        .toString()
                        .padStart(2, "0")
                    const day =
                      loaded &&
                      Math.floor(Math.random() * 31 + 1)
                        .toString()
                        .padStart(2, "0")

                    // Only for demo purposes - use real prices on production
                    const price =
                      loaded &&
                      Math.floor(Math.random() * 90 + 1) +
                        Math.random().toFixed(2)

                    const badges = [
                      <Badge bg="success-light" text="success">
                        Open
                      </Badge>,
                      <Badge bg="danger-light" text="danger">
                        Closed
                      </Badge>,
                      <Badge bg="warning-light" text="warning">
                        On Hold
                      </Badge>,
                      <Badge bg="info-light" text="info">
                        In Progress
                      </Badge>,
                    ]

                    // Only for demo purposes
                    const demoBadge = index % badges.length

                    return (
                      <tr className="align-middle" key={index}>
                        <td>
                          {/* ORDER ID - Only for demo purposes - customize ID on production */}
                          <Form.Check
                            type="checkbox"
                            label={`#${2568 + index++}`}
                          />
                          {/* END ORDER ID */}
                        </td>

                        <td>
                          {/* ORDER TITLE */}
                          <a href="/e-commerce-order" className="text-dark">
                            <strong>{item.person}</strong>
                            <br />
                            <span className="text-muted text-sm">
                              {item.email}
                            </span>
                          </a>
                          {/* END ORDER TITLE */}
                        </td>
                        <td>
                          {/* ORDER DATE - Only for demo purposes - use real dates on production */}
                          2021/{month}/{day}
                          {/* END ORDER DATE */}
                        </td>
                        <td>
                          {/* ORDER PRICE - Only for demo purposes - use real prices on production */}
                          ${price}
                          {/* END PRICE DATE */}
                        </td>

                        <td>
                          {/* ORDER BADGES */}

                          {badges[demoBadge]}

                          {/* END ORDER BADGES */}
                        </td>
                        <td>
                          {/* ORDER REVIEW */}
                          <Stars stars="4" />
                          {/* END ORDER REVIEW */}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <span className="me-2" id="categoryBulkAction">
                <Form.Select
                  size="sm"
                  className="d-inline w-auto"
                  name="categoryBulkAction"
                >
                  <option>Bulk Actions</option>
                  <option>Delete</option>
                </Form.Select>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="align-top ms-1"
                >
                  Apply
                </Button>
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
