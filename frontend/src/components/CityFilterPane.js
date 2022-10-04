import React from 'react';
import {Card,Form,Row,Col} from "react-bootstrap"
import capitalizeFirstLetter from '../custom_functions/capitalizeFirstLetter';

const options_continent = ['asia', 'europe', 'america']
const options_sort = ['popularity', 'life quality', 'revelant']

const renderFilterOptions = (options) =>{
    return (
        <Form.Select className="d-inline-block w-auto me-3 mb-1 mb-lg-0">
            {options.map((item, i) => {
                return <option key={i} value={item}>{capitalizeFirstLetter(item)}</option>
            })}
        </Form.Select>
    )
}

const FilterPane = () => {
    return (
        <div>
            <Card className="mb-5">
                <Card.Body>
                    <Row>
                        <Col sm={6}>
                        {renderFilterOptions(options_continent)}
                        {renderFilterOptions(options_sort)}
                        </Col>
                        <Col sm={6} className="text-md-end">
                            <Form.Label
                                className="text-muted text-sm me-2 d-none d-lg-inline-block"
                                htmlFor="media_search"
                            >
                                Search
                            </Form.Label>
                            <Form.Control
                                className="form-control d-inline-block w-auto"
                                id="media_search"
                                type="search"
                                placeholder="Country"
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default FilterPane;
