import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    activeTheme: boolean;
 }
const initialState: ThemeState = {
    activeTheme: false,
};
export  const themeSlice = createSlice({
    name: "theme",//ISDARKMODELOGIC
    initialState: initialState,
    reducers: {
      changeTheme: (state, action: PayloadAction<boolean>) => {
        state.activeTheme = action.payload;
        localStorage.setItem('theme', `${state.activeTheme}`)
      }
    }
   });
   export const { changeTheme } = themeSlice.actions;

    export default themeSlice.reducer;
