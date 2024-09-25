import { createSlice } from '@reduxjs/toolkit';

export interface InterfaceUserStateAuth {
  'token-type': string,
}

export interface InterfaceUserStateData {
  email: string;
}

export interface InterfaceUserState {
  isLoggedIn: boolean;
  data: InterfaceUserStateData;
}

const initialState = { isLoggedIn: false } as InterfaceUserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    makeLogged: state => ({
      ...state,
      isLoggedIn: true
    }),
    updateUserAuth: (state, { payload }: { payload: any }) => ({
      ...state,
      auth: { ...payload }
    }),
    updateUserData: (state, { payload }: { payload: Partial<InterfaceUserStateData> }) => ({
      ...state,
      data: { ...state.data, ...payload }
    }),
    remove: () => initialState
  }
});

export const { updateUserAuth, updateUserData, remove: removeUser, makeLogged } = userSlice.actions;

export default userSlice.reducer;
