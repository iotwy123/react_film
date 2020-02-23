import React from 'react'

export default class HomeContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:""
        }
    }
    render(){
        return(
            <div>
                <h1>HomeContainer</h1>
            </div>
        )
    }
}