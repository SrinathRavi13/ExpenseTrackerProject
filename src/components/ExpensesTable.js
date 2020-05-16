import React from 'react'
import { Row, Col, Container} from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'
import PropTypes from 'prop-types'

/**
 *  Expenses Table - Re usable table Component
 */

/** Creating property object */
const propTypes = {
    //An Array
    expenseList : PropTypes.array.isRequired
}

/** 
 * Table Class
*/
class ExpensesTable extends React.PureComponent {

    render() {

        const {expenseList} = this.props;
        let hasExpenses = (expenseList && expenseList.length > 0);

        /** Show the expenses table if there is record */
        const rows = (hasExpenses) ? (
            /** Generate table rows from the property */
            expenseList.map((expense) =>
              <ExpenseItem key={expense.id + expense.description} expenseItem={expense}/>
            )
        ) : (
                <em>Please add some Expenses</em>
            );

        return (
            <div>
                {/** Table Container */}
                <Container fluid>
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
                    {rows}
                </Container>
            </div>
        );
    }
}

//Assigning the property object to the class
ExpensesTable.propTypes = propTypes;

export default ExpensesTable;
