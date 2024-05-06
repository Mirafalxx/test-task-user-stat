import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/usersApi";
import { IAgeGroupStats, IGenderGroupStats, IUser } from "../types/userTypes";

type UserState = {
  users: IUser[] | [];
  ageGroups: IAgeGroupStats;
  genderGroups: IGenderGroupStats;
  error: string | null;
  loading: boolean;
  searchTerm: string;
  totalUsers: number;
};

const initialState: UserState = {
  users: [],
  ageGroups: {},
  genderGroups: { female: 0, male: 0 },
  loading: false,
  error: null,
  searchTerm: "",
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        if (payload?.users) {
          state.users = payload?.users;
          state.ageGroups = payload?.ageGroups;
          state.genderGroups = payload?.genderGroups;
          state.totalUsers = payload?.totalUsers || 0;
          state.loading = false;
        }
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        if (payload) {
          state.error = "Something went wrong";
          state.loading = false;
        }
      });
  },
  selectors: {
    getLoading: (state) => state.loading,
    getUsers: (state) => state.users,
    getAgeGroups: (state) => state.ageGroups,
    getGengerGroups: (state) => state.genderGroups,
    getTotalUsers: (state) => state.totalUsers,
    getSearchTerm: (state) => state.searchTerm,
  },
});

export const { changeSearchTerm } = userSlice.actions;
export const { getLoading, getUsers, getAgeGroups, getGengerGroups, getTotalUsers, getSearchTerm } =
  userSlice.selectors;
export default userSlice.reducer;
