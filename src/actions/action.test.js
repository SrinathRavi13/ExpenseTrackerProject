import { findByTestAttribute, testStore } from '../../Utils';

const intialState = {
    expenseReducer: {
        expenseList: [
            {
                id: 1,
                description: "Test1",
                amount: 20,
                taxes: 3,
                date: "2020-05-15 at 1:07"
            },
            {
                id: 2,
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

const setUp = (state = intialState) => {
    const store = testStore(state);
    return store;
}

describe("action creators", ()=>{
    let store;
    beforeEach(() => {
        store = setUp();
    })

    describe("fetch expenses List", ()=> {
        it("fetch_Api_Data", () => {
            store.dispatch({
                type : "INIT_STORE"
            })
        })
    })

})