import axios from 'axios'

const GET_MESSAGES = "GET_MESSAGE"

export const _getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages,
})

export const getMessages = (chatId) => (
    async (dispatch) => {
        try {
        const { data } = await axios.get(`/api/chats/${chatId}/messages`)
        dispatch(_getMessages(data))
    } catch (err) {
        console.log("Error in messages route")
    }
    })


export default (state = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.messages
        default: 
            return state
    }
}