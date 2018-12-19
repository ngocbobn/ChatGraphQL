const testActions = {
    CHANGE_VALUE: 'CHANGE_VALUE',
    CHANGE_VALUE_SAGA: 'CHANGE_VALUE_SAGA',
    changeValue: (value) => ({
        type: testActions.CHANGE_VALUE_SAGA,
        payload: { value }
    })
};
export default testActions;