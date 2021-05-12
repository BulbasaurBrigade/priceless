import React from 'react'

export default class ChatInput extends React.Component {

    render(){
        return(
            <div>
                <form>
                    <input type = 'text'>
                    </input>
                    <button type = "submit">Send</button>
                </form>
            </div>
        )
    }
}