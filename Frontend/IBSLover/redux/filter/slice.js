import { createSlice } from '@reduxjs/toolkit'
import { fetchKeywords } from './operations';

const initialState = {
    filters: {
        keyword: [],
        votingCount: 0,
        bannedWord: [],
        error: null,
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setVotingCount: (state, action) => {
            state.filters.votingCount = action.payload
        },
        setBannedWord: (state, action) => {
            state.filters.bannedWord = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKeywords.pending, (state) => {
                console.log('fetching keywords 1')
            })
            .addCase(fetchKeywords.fulfilled, (state, action) => {
                console.log('fetched keywords 1')
                state.filters.keyword = action.payload
            })
            .addCase(fetchKeywords.rejected, (state, action) => {
                state.filters.error = action.payload
            })
    }
})


export const filterReducer = filterSlice.reducer;
export const { setVotingCount, setBannedWord } = filterSlice.actions

export const selectKeyword = (state) => state.filter.filters.keyword;

export const selectVotingCount = state => state.filter.filters.votingCount;

export const selectBannedWord = state => state.filter.filters.bannedWord;


