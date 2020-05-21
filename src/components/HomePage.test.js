import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import { findByTestAttribute, testStore } from '../../Utils';

import HomePage from './HomePage';
import Table from './ExpensesTable';



const setUp = (state) => {
    const store = testStore(state);
    const component = shallow(<HomePage store={store} {...state}/>).childAt(0).dive();
    return component;
}

describe('HomePage Component', () => {
    
    const state = {
        expenseReducer: {
            expenseList: [
                {
                    _id: 1,
                    description: "Test1",
                    amount: 20,
                    taxes: 3,
                    date: "2020-05-15 at 1:07"
                },
                {
                    _id: 2,
                    description: "Test2",
                    amount: 50,
                    taxes: 7.5,
                    date: "2020-05-16 at 5:07"
                }
            ],
            totalAmount: 70,
            totalTax: 10.5
        }
    };

    let component;
    beforeEach(() => {
        component = setUp(state);
    })

    it('Should render without Error', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('sets the Table component property', () => {
        const table = component.find(Table);
        expect(table.props().List).toEqual(state.expenseReducer.expenseList);
    })

    describe('find all the attributes of the component', ()=>{
        
        it('Should render Header', () => {
            const wrapper = findByTestAttribute(component, "Header");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render title', () => {
            const wrapper = findByTestAttribute(component, "title");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render totalAmount', () => {
            const wrapper = findByTestAttribute(component, "totalAmount");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render totalTax', () => {
            const wrapper = findByTestAttribute(component, "totalTax");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render expense_table', () => {
            const wrapper = findByTestAttribute(component, "expense_table");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render addExpenseForm', () => {
            const wrapper = findByTestAttribute(component, "addExpenseForm");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render expense_table', () => {
            const wrapper = findByTestAttribute(component, "expense_table");
            expect(wrapper.length).toBe(1);
        })
    
        it('Should render modalPopup', () => {
            const wrapper = findByTestAttribute(component, "modalPopup");
            expect(wrapper.length).toBe(1);
        })
    })
    

    

})

