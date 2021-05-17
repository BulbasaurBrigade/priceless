import axios from "axios";

const SET_MARKER = "SET_MARKER"

export const _setMarker = (marker) => ({
    type: SET_MARKER,
    marker,
})

export const setMarker = (postId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/posts/${postId}`)
            dispatch(_setMarker(data))
        } catch (err) {
            console.log("error in marker thunk")
        }
    }
}

export default (state = {}, action) =>  {
    switch (action.type) {
        case SET_MARKER:
            return action.marker;
        default:
            return state;
    }
}