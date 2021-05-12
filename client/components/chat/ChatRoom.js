import React from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import ChatInput from './ChatInput'

export default class ChatRoom extends React.Component {
    
    render() {
        return(
            <div>
                <ChatHeader />
                <MessageContainer />
                <ChatInput />
            </div>
        )
    }
}