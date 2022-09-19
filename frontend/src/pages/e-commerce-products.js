import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faDownload, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  Card,
  Container,
  Tabs,
  Tab,
  Table,
  Badge,
  Button,
} from "react-bootstrap"
import { DataTable } from "simple-datatables"
import Breadcrumbs from "../components/Breadcrumbs"
import products from "../data/products.json"
export async function getStaticProps() {
  return {
    props: {
      title: "Products",
    },
  }
}
export default function eCommerceCustomers(props) {
  const [activeTab, setActiveTab] = useState("allProducts")
  const [tableLoaded, setTableLoaded] = useState(false)
  const dataTableRef = useRef(false)
  const router = useRouter()
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

  const EditButtonsLink = (dataTable) => {
    const tableWrapper = dataTable.table.closest(".dataTable-wrapper")
    // Make edit icon Nextjs link
    const editButtons = tableWrapper.querySelectorAll(
      "tbody tr td:last-child a:first-of-type"
    )
    if (editButtons) {
      editButtons.forEach((item) => {
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
        EditButtonsLink(dataTable)
        setTableLoaded(true)
      })

      dataTable.on("datatable.page", function () {
        EditButtonsLink(dataTable)
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
        <div>
          <Link href="/e-commerce-product-new" passHref>
            <Button variant="primary" className="text-uppercase">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add new
            </Button>
          </Link>
        </div>
      </div>

      <section className="mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={(eventKey) => setActiveTab(eventKey)}
          className="mb-5"
        >
          <Tab eventKey="allProducts" title="All Products">
            {/* PRODUCTS TABLE */}
            <Card className="card-table mb-4">
              <Card.Body>
                <div
                  className={`preload-wrapper ${
                    tableLoaded ? "opacity-10" : ""
                  }`}
                >
                  <Table
                    responsive
                    borderless
                    hover
                    className="align-middle mb-0"
                    ref={dataTableRef}
                  >
                    <thead>
                      <tr>
                        <th>Product Id</th>
                        <th style={{ minWidth: "300px" }}>Name</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Last Ordered</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
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
                        return (
                          <tr className="align-middle" key={index}>
                            <td>
                              {/* PRODUCT ID - Only for demo purposes - customize ID on production */}
                              #{2568 + index++}
                              {/* END PRODUCT ID */}
                            </td>

                            <td>
                              {/* PRODUCT TITLE & IMAGE */}
                              <img
                                className="card-table-img img-fluid me-3"
                                src={product.img}
                                alt={product.img}
                                width="80"
                              />
                              <a
                                className="text-reset text-decoration-none"
                                href="#!"
                              >
                                <strong>{product.title}</strong>
                              </a>
                              {/* END PRODUCT TITLE & IMAGE */}
                            </td>
                            <td>{product.price}</td>

                            <td>
                              {/* PRODUCT STOCK - Only for demo purposes - customize STOCK amount on production */}
                              {43 + index++}
                              {/* END PRODUCT STOCK */}
                            </td>
                            <td className="text-muted">
                              {/* PRODUCT DATE - Only for demo purposes - use real dates on production */}
                              2021/{month}/{day}
                              {/* END PRODUCT DATE */}
                            </td>
                            <td>
                              {/* PRODUCT BADGES */}
                              {product.new && (
                                <Badge bg="primary-light" text="primary">
                                  New Arrival
                                </Badge>
                              )}
                              {product.hot && (
                                <Badge bg="success-light" text="success">
                                  Hot
                                </Badge>
                              )}
                              {product.trending && (
                                <Badge bg="info-light" text="info">
                                  Hot
                                </Badge>
                              )}

                              {product.soldout && (
                                <Badge bg="danger-light" text="danger">
                                  Soldout
                                </Badge>
                              )}
                              {/* END PRODUCT BADGES */}
                            </td>
                            <td>
                              {/* ACTIONS */}
                              <a
                                className="me-3 text-lg text-success"
                                href="/e-commerce-product-new"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </a>
                              <a className="text-lg text-danger" href="#!">
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </a>
                              {/* END ACTIONS */}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <span className="me-2" id="categoryBulkAction">
                    <select
                      className="form-select form-select-sm d-inline w-auto"
                      name="categoryBulkAction"
                    >
                      <option>Bulk Actions</option>
                      <option>Delete</option>
                    </select>
                    <button className="btn btn-sm btn-outline-primary align-top ms-1">
                      Apply
                    </button>
                  </span>
                </div>
              </Card.Body>
            </Card>
            {/* END PRODUCTS TABLE */}
          </Tab>
          <Tab eventKey="archived" title="Archived"></Tab>
          <Tab eventKey="drafts" title="Drafts"></Tab>
          <Tab eventKey="outOfStock" title="Out of Stock"></Tab>
        </Tabs>
      </section>
    </Container>
  )
}
