import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Item from './ExpenseItem'
import PropTypes from 'prop-types'

/**
 *  Expenses Table - Re usable table Component
 */

/** Creating property object */
const propTypes = {
    //An Array
    List: PropTypes.array.isRequired,
    handle_UpdateItem: PropTypes.func.isRequired,
    handle_DeleteItem: PropTypes.func.isRequired
}

/** 
 * Table Class
*/
class Table extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            List : this.props.List
        }
    }

    /** Update Table Item */
    handle_UpdateItem = (item) => {
        this.props.handle_UpdateItem(item);
    }

    /** Delete Table Item */
    handle_DeleteItem = (item_id) => {
        this.props.handle_DeleteItem(item_id);
    }

    render() {

        const { List } = this.props;
        let hasExpenses = (List && List.length > 0);

        /** Show the expenses table if there is record */
        const tableRows = (hasExpenses) ? (
            /** Generate table rows from the property */
            List.map((expense) =>
                <Item key={expense._id}
                    Item={expense}
                    handle_UpdateItem={this.handle_UpdateItem}
                    handle_DeleteItem={this.handle_DeleteItem}
                />
            )
        ) : (
                <em>Please add some Expenses</em>
            );

        return (
            <React.Fragment>
                {/** Table Container */}
                <Container id="table" fluid>
                    {/** Table Header */}
                    <Row>
                        <Col xs={2}>
                            <h6>Description</h6>
                        </Col>
                        <Col xs={2}>
                            <h6>Amount</h6>
                        </Col>
                        <Col xs={2}>
                            <h6>Taxes(15%)</h6>
                        </Col>
                        <Col xs={2}>
                            <h6>Date</h6>
                        </Col>
                        <Col xs={1}>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    {/** Table Body  */}
                    {tableRows}
                </Container>
            </React.Fragment>
        );
    }
}

//Assigning the property object to the class
Table.propTypes = propTypes;

/** Export the Table class to be reusable */
export default Table;
