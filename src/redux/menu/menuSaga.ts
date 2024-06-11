import { takeLatest, call, put, select } from "redux-saga/effects";
import { ATTEMPT_ADD_MENU_ITEMS } from "../constants";
import { addMenuItems, setMenuLoading } from "./menuReducer";
import { RootState } from "../store";

function* attemptAddMenuItems() {
  yield put(setMenuLoading(true))
  yield put(addMenuItems());

  const { menu: { menuForm: { error, optionError } } }: RootState = yield select();

  if (Object.keys({ ...error }).length && optionError) {
    yield put(setMenuLoading(false))
  }
}

export default function* menuSaga() {
  yield takeLatest(ATTEMPT_ADD_MENU_ITEMS, attemptAddMenuItems)
}
