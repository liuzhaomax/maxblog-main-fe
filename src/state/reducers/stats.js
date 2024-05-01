import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    articleQuantity: 0,
}

export const stats = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setArticleQuantity: (state, action) => {
            state.articleQuantity = action.payload
        }
    },
})

export const { setArticleQuantity } = stats.actions

export default stats.reducer

// import { useDispatch, useSelector } from "react-redux"
// const auth = useSelector(state => state.auth)
// const dispatch = useDispatch()
