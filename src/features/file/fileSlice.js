import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileService from "./fileService";

const initialState = {
  fileData: "",
  fileMessage: "",
  fileError: false,
  fileSuccess: false,
  fileLoading: false,
};
export const createFile = createAsyncThunk(
  "file/create",
  async (fileData, thunkAPI) => {
    try {
      console.log("fileData", fileData);
      return await fileService.createFile(fileData);
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

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    fileReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFile.pending, (state) => {
        state.fileLoading = true;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.fileLoading = false;
        state.fileSuccess = true;
        state.fileData = action.payload;
      })
      .addCase(createFile.rejected, (state, action) => {
        state.fileLoading = false;
        state.fileError = true;
        state.fileData = action.payload;
        state.fileMessage = action.payload;
      });
  },
});

export const { fileReset } = fileSlice.actions;
export default fileSlice.reducer;
