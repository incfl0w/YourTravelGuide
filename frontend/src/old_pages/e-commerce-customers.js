import { Card, Container, Table, Badge, Form, Button } from "react-bootstrap"
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import Breadcrumbs from "../components/Breadcrumbs"
import { DataTable } from "simple-datatables"
import data from "../data/tables-datatable.json"
import Avatar from "../components/Avatar"
export async function getStaticProps() {
  return {
    props: {
      title: "Customers",
    },
  }
}
export default function eCommerceCustomers(props) {
  const [tableLoaded, setTableLoaded] = useState(false)
  const dataTableRef = useRef(false)
  const [loaded, setLoaded] = useState(false)
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
  // Init datatable
  useEffect(() => {
    // Client loaded
    setLoaded(true)

    if (loaded) {
      const dataTable = new DataTable(dataTableRef.current, {
        columns: [
          // Disable sorting on the first column
          // { select: [0], sortable: false },
        ],
      })
      adjustTableColumns(dataTable)

      window.addEventListener("resize", () => adjustTableColumns(dataTable))

      dataTable.on("datatable.init", function () {
        bootstrapizeHeader(dataTable)
        setTableLoaded(true)
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
                    <th>Customer</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Orders</th>
                    <th>Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    // Only for demo purposes - use real prices on production
                    const price =
                      loaded &&
                      Math.floor(Math.random() * 90 + 1) +
                        Math.random().toFixed(2)

                    // Only for demo purposes - use real avatar on production
                    const avatarIndex = index % 11
                    const avatarColorVariant =
                      index % 2 ? "warning-light" : "primary-light"
                    return (
                      // Only for demo purposes - remove index < 20 on production
                      index < 20 && (
                        <tr
                          className="align-middle text-muted text-sm"
                          key={index}
                        >
                          <td
                            style={{ minWidth: "250px" }}
                            className="text-dark text-base d-flex align-items-center"
                          >
                            {/* CUSTOMER - Only for demo purposes - customize AVATAR on production */}
                            <Form.Check
                              type="checkbox"
                              className="d-inline-block me-2"
                            />
                            <a
                              className="text-reset text-decoration-none  d-flex align-items-center"
                              href="#!"
                            >
                              {avatarIndex % 3 == 0 ? (
                                <Avatar
                                  text={item.person.substr(0, 1)}
                                  variant={avatarColorVariant}
                                  className="avatar p-1 me-2"
                                />
                              ) : (
                                <Avatar
                                  image={`/img/avatar-${avatarIndex}.jpg`}
                                  alt={item.person}
                                  priority
                                  className="me-2"
                                  border
                                />
                              )}
                              <strong>{item.person}</strong>
                            </a>
                            {/* END CUSTOMER */}
                          </td>

                          <td>
                            {/* CUSTOMER CITY */}
                            {item.city}
                            {/* END CUSTOMER TITLE */}
                          </td>
                          <td>
                            {/* CUSTOMER EMAIL */}
                            {item.email}
                            {/* END CUSTOMER EMAIL */}
                          </td>
                          <td>
                            {/* CUSTOMER PHONE */}
                            {item.phone}
                            {/* END CUSTOMER PHONE */}
                          </td>
                          <td>
                            {/* CUSTOMER STATUS */}
                            {item.isActive ? (
                              <Badge bg="success-light" text="success">
                                Active
                              </Badge>
                            ) : (
                              <Badge bg="danger-light" text="danger">
                                Inactive
                              </Badge>
                            )}
                            {/* END CUSTOMER STATUS */}
                          </td>
                          <td>
                            {/* CUSTOMER ORDERS */}
                            {item.orders + 2}
                            {/* END CUSTOMER ORDERS */}
                          </td>
                          <td>
                            {/* CUSTOMER SPENT - for demo purposes only, use real prices on production*/}
                            ${price}
                            {/* END CUSTOMER SPENT */}
                          </td>
                        </tr>
                      )
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
