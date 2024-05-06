import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../utils/axiosApi";
import { ageGroupStats, genderGroupStats } from "../../utils/utils";
import { IUser } from "../types/userTypes";

export const fetchUsers = createAsyncThunk("fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get("/api/", {
      params: {
        results: 500,
      },
    });
    const users = response.data?.results as IUser[];

    const totalUsers = response.data?.info.results;
    const ageGroups = ageGroupStats(users);
    const genderGroups = genderGroupStats(users);

    return { users, ageGroups, genderGroups, totalUsers };
  } catch (error) {
    rejectWithValue("error");
  }
});
