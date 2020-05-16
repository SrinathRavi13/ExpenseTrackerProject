import React from 'react'
import { Row, Col, Container, Button, Modal} from 'react-bootstrap'
import ExpensesTable from './ExpensesTable'
import AddExpenseForm from './AddExpenseForm'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { fetch_Api_Data} from '../actions/actions'

/**
 * Home page
 * The landing page of the application
 * @author - Srinath Ravi <srinath_ravi@hotmail.com>
 */
class HomePage extends React.Component {

    /** Local state - Handle modal popup Add Expense */
    state = { showModal_AddExpense: false }

    componentDidMount() {
        /** Fetch expenses list */
        this.props.fetch_Api_Data() 
    }

    /** Close Add Expense Modal popup */
    handleClose = () => {
        
        this.setState({ showModal_AddExpense: false });
    }

    /** Close the Modal popup  once Expense Added*/
    handleSave = (val) => {
        this.setState({ showModal_AddExpense: val });
    }

    /** Open Add Expense Modal popup */
    handleOpenModal = () => {
        this.setState({showModal_AddExpense : true});
    }

    render() {

        /** Render Home Page*/
        const {totalAmount, totalTax} = this.props;
        const {showModal_AddExpense} = this.state;

        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>Expense Tracker</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <h5>The sub-total of expenses is : {totalAmount}</h5>
                            <h5>The total taxes is : {totalTax}</h5>
                        </Col>
                        <Col>
                            <Button variant="success" onClick={this.handleOpenModal}>Add new expense</Button>
                        </Col>
                    </Row>
                </Container>
                <ExpensesTable expenseList={this.props.expenseList}/>
                <Modal show={showModal_AddExpense} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddExpenseForm handleSave={this.handleSave} />
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

/** Map the Redux state value to the component properties 
 * @param {object} state - Redux State 
 * @return {expenseList, totalAmount, TotalTax}
 */
const mapStateToProps = state => {
    return {
        expenseList: state.expenseList,
        totalAmount : state.totalAmount,
        totalTax : state.totalTax
    }
}

/**
 * Map actions to props
 * @param {callback} dispatch 
 * @return {Object} - Actions maped to props
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetch_Api_Data : fetch_Api_Data
    }, dispatch)
}

/** Connect Redux to the Component*/
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
