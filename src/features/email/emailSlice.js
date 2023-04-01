import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";

const initialState = {
  email: "",
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};
export const createEmail = createAsyncThunk(
  "email/create",
  async (emailData, thunkAPI) => {
    try {
      console.log("emailData", emailData);
      return await emailService.createEmail(emailData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.email = action.payload;
      })
      .addCase(createEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
