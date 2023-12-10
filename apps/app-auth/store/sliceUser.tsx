import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const initialState: UserState = {
  id: -1,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  token: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const initKeys = Object.keys(initialState);
      Object.keys(payload).map((pKey) => {
        if (initKeys.includes(pKey)) {
          // @ts-expect-error Unknown Key
          state[pKey] = payload[pKey];
        }
      });
    },
    resetUser: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser: actionSetUser, resetUser: actionResetUser } =
  UserSlice.actions;

export default UserSlice.reducer;
