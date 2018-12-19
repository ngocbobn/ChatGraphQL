import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
    value: null
});

export default function diceReducer(
    state = initState.merge(new Map({ coin: localStorage.getItem('coin') })),
    action
) {
    switch (action.type) {
        case actions.CHANGE_VALUE:
            return state.set('value', action.payload.value)
        default:
            return state;
    }
}
