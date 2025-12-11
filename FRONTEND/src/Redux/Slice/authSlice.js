import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: "Network error",
      });
    }
  }
);

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data.user;
    } catch (err) {
      return rejectWithValue({
        message: "Network error",
      });
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data.user;
    } catch (err) {
      return rejectWithValue({
        message: "Network error",
      });
    }
  }
);

const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return true;
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const isFormData = formData instanceof FormData;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update`, {
        method: "PUT",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        credentials: "include",
        body: isFormData ? formData : JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data.user;
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

const deleteUserAccount = createAsyncThunk(
  'auth/deleteUserAccount',
  async(_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return true;
    } catch (err) {
      return rejectWithValue({ message: 'Network error' });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    loading: true,
  },
  reducers: {
    logoutLocal(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed";
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  },
});
export const { logoutLocal, setUser, clearUser } = authSlice.actions;
export { fetchCurrentUser, loginUser, register, logoutUser, updateUser, deleteUserAccount };
export default authSlice.reducer;
