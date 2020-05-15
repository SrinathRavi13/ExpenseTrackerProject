import React from 'react'
import { Row, Col, Container, Button, Modal} from 'react-bootstrap'
import ExpensesTable from './ExpensesTable'
import AddExpenseForm from './AddExpenseForm'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { fetch_Api_Data} from '../actions/actions'

class HomePage extends React.Component {

    state = { showModal_AddExpense: false }

    componentDidMount() {
        this.props.fetch_Api_Data()
    }

    handleClose = () => {
        this.setState({ showModal_AddExpense: false });
    }

    handleSave = (val) => {
        this.setState({ showModal_AddExpense: val });
    }

    handleOpenModal = () => {
        this.setState({showModal_AddExpense : true});
    }

    handleClose = () => {
        this.setState({ showModal_AddExpense: false });
    }

    render() {

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
                <ExpensesTable/>
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

const mapStateToProps = state => {
    return {
        expenseList: state.expenseList,
        totalAmount : state.totalAmount,
        totalTax : state.totalTax
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetch_Api_Data : fetch_Api_Data
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);