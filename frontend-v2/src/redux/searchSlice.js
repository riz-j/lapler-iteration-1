import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchState: false
    },
    reducers: {
        toggleSearchState: (state) => {
            return {
                ...state,
                searchState: !state.searchState
            }
        }
    },
    }
)
export const { toggleSearchState } = searchSlice.actions; 
export default searchSlice.reducer;