import React from 'react'

export default class AboutContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:""
        }
    }
    render(){
        return(
            <div>
                <h1>AboutContainer</h1>
            </div>
        )
    }
}