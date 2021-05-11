import React from 'react'
import ChatCard from './ChatCard'

export default class ChatPanel extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
            <div className="search">

            </div>
            <div>
                <ChatCard />
            </div>
            </div>
        )
    }
}