import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';

export function* changeValueSagas() {
    yield takeEvery(actions.CHANGE_VALUE_SAGA, function* (action) {
        debugger
        var str = 'aaaaaa' + action.payload.value
        yield put({ type: actions.CHANGE_VALUE, payload: { value: str } });
    });
}

export default function* rootSaga() {
    yield all([
        fork(changeValueSagas)
    ]);
}
