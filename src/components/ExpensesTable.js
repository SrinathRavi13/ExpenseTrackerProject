import React from 'react'
import { Row, Col, Container} from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'
import { connect } from 'react-redux'

/**
 *  Expenses Table
 */
class ExpensesTable extends React.PureComponent {

    render() {

        const {expenseList} = this.props;
        let hasExpenses = (expenseList && expenseList.length > 0);

        /** Show the expenses table if there is record */
        const rows = (hasExpenses) ? (
            expenseList.map((expense) =>
              <ExpenseItem key={expense.id + expense.description} expenseItem={expense}/>
            )
        ) : (
                <em>Please add some Expenses</em>
            );

        return (
            <div>
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

/** Map the Redux state value to the component properties 
 * @param {object} state - Redux State 
 * @return {expenseList}
 */
const mapStateToProps = state => {
    return {
        expenseList: state.expenseList
    }
}

/** Connect Redux to the Component*/
export default connect(mapStateToProps)(ExpensesTable);
