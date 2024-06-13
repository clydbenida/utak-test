import { takeLatest, call, put, select } from "redux-saga/effects";
import { ATTEMPT_ADD_MENU_ITEMS, ATTEMPT_DELETE_MENU_ITEMS, ATTEMPT_EDIT_MENU_ITEMS } from "../constants";
import { resetMenuForm, setMenuLoading, validateMenuFormFields } from "./menuReducer";
import { RootState } from "../store";
import { deleteMenuItem, editMenuItem, postMenuItem } from "../../firebase/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteItemSagaParams } from "../../types/redux";

function* attemptAddMenuItems() {
  yield put(setMenuLoading(true))
  yield put(validateMenuFormFields());

  const { menu: { menuForm: { error, optionError } } }: RootState = yield select();

  if (Object.keys({ ...error }).length && optionError) {
    yield put(setMenuLoading(false))
  } else {
    const { menu: { menuForm: { fields } } }: RootState = yield select();

    yield call(postMenuItem, fields);
    yield put(resetMenuForm());
  }
}

function* attemptEditMenuItems() {
  yield put(setMenuLoading(true))
  yield put(validateMenuFormFields());

  const { menu: { menuForm: { error, optionError } } }: RootState = yield select();

  if (Object.keys({ ...error }).length && optionError) {
    yield put(setMenuLoading(false))
  } else {
    const { menu: { menuForm: { fields } } }: RootState = yield select();

    yield call(editMenuItem, fields);
    yield put(resetMenuForm());
    yield put(setMenuLoading(false))
  }
}

function* attemptDeleteMenuItem(action: PayloadAction<DeleteItemSagaParams>) {
  try {
    yield call(deleteMenuItem, action.payload.menu_id);
  } catch (err) {
    yield call(console.error, err)
  }
}

export default function* menuSaga() {
  yield takeLatest(ATTEMPT_ADD_MENU_ITEMS, attemptAddMenuItems)
  yield takeLatest(ATTEMPT_EDIT_MENU_ITEMS, attemptEditMenuItems)
  yield takeLatest(ATTEMPT_DELETE_MENU_ITEMS, attemptDeleteMenuItem)
}
