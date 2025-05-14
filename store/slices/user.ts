import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUserInStore: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAgencyLogoInStore: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      if (state.user?.agency?.logo) {
        state.user.agency.logo = action.payload;
      }
    },
    toggleJobCategoryInStore: (
      state,
      action: PayloadAction<{ jobId: string; category: string }>
    ) => {
      const { jobId, category } = action.payload;
      if (category === 'Allocated') {
        state.user?.agency?.allocatedJobIds.push(jobId);
      } else if (category === 'Deallocated') {
        const index1 = state.user?.agency?.allocatedJobIds.indexOf(jobId);
        if (index1 !== -1) {
          state.user?.agency?.allocatedJobIds.splice(index1!, 1);
        }
        const index2 = state.user?.agency?.engagedJobIds.indexOf(jobId);
        if (index2 !== -1) {
          state.user?.agency?.engagedJobIds.splice(index2!, 1);
        }

        state.user?.agency?.deallocatedJobIds.push(jobId);
      } else if (category === 'Engaged') {
        // const index1 = state.user?.agency?.allocatedJobIds.indexOf(jobId);
        // console.log(index1);
        // if( index1 !== -1) {
        //   state.user?.agency?.allocatedJobIds.splice(index1!, 1);
        // }
        // const index2 = state.user?.agency?.deallocatedJobIds.indexOf(jobId);
        // console.log(index2);
        // if(index2 !== -1) {
        //   state.user?.agency?.deallocatedJobIds.splice(index2!, 1);
        // }
        state.user?.agency?.engagedJobIds.push(jobId);
      }
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setUserInStore,
  setIsAuthenticated,
  toggleJobCategoryInStore,
  setAgencyLogoInStore,
} = userSlice.actions;
export default userSlice.reducer;
