import axios from 'axios'

const GET_CHATS = "GET_CHATS"

export const _getChats = (chats) => ({
    type: GET_CHATS,
    chats, 
})

export const getChats = (id) => (
    async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/chats/users/${id}/`)
            dispatch(_getChats(data))
        } catch(err) {
            console.log("error in chats thunk")
        }
    }
)

export default (state = [], action) => {
    switch(action.type) {
        case GET_CHATS:
            return action.chats;
        default:
            return state
    }
}