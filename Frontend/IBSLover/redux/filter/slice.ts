import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchKeywords } from './operations';
import { RootState } from '../store';

interface IFilterState {
    filters: {
        keyword: string[];
        votingCount: number;
        bannedWord: string[];
        error: string | null;
    };
}

const initialState: IFilterState = {
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
        setVotingCount: (state, action: PayloadAction<number>) => {
            state.filters.votingCount = action.payload
        },
        setBannedWord: (state, action: PayloadAction<string[]>) => {
            state.filters.bannedWord = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKeywords.pending, (state) => {
                console.log('fetching keywords 1')
            })
            .addCase(fetchKeywords.fulfilled, (state, action: PayloadAction<string[]>) => {
                console.log('fetched keywords 1')
                state.filters.keyword = action.payload
            })
            .addCase(fetchKeywords.rejected, (state, action: PayloadAction<any>) => {
                state.filters.error = action.payload
            })
    }
})

export const filterReducer = filterSlice.reducer;
export const { setVotingCount, setBannedWord } = filterSlice.actions;

export const selectKeyword = (state: RootState) => state.filter.filters.keyword;

export const selectVotingCount = (state: RootState) => state.filter.filters.votingCount;

export const selectBannedWord = (state: RootState) => state.filter.filters.bannedWord;
