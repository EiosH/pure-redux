import { put, takeEvery, delay } from "../src/redux-saga";

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "ADD", payload: 1 });
}

function* watchIncrementAsync() {
  yield takeEvery("ASYNC_ADD", incrementAsync);
}

export default function* rootSaga() {
  yield watchIncrementAsync();
}
