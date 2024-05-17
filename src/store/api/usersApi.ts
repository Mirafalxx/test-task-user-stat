import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAgeGroupStats, IGenderGroupStats, IUser } from 'store/types/userTypes';
import axiosApi from 'utils/axiosApi';
import { ageGroupStats, genderGroupStats } from 'utils/utils';

export const fetchUsers = createAsyncThunk('fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/api/', {
      params: {
        results: 100,
      },
    });
    const users = response.data?.results as IUser[];

    const totalUsers = response.data?.info.results;
    const ageGroups = ageGroupStats(users) as IAgeGroupStats;
    const genderGroups = genderGroupStats(users) as IGenderGroupStats;

    return { users, ageGroups, genderGroups, totalUsers };
  } catch (error) {
    rejectWithValue('error');
  }
});
