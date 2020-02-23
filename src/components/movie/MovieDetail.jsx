import React from 'react'
import { Button, Icon,Spin,Alert } from 'antd';
import fetchjsonp from 'fetch-jsonp'
export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:"",
            info:{},
            isloading:true,
        }
    }
    componentWillMount(){
            fetchjsonp('https://douban.uieee.com/v2/movie/subject/'+this.props.match.params.id)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    info:data,
                    isloading:false,
                })
            })
    }
    render(){
        return(
            <div>
                {/* <h1>detail{this.props.match.params.id}</h1> */}
                <Button type="primary" onClick={this.goback}>
                    <Icon type="left" />
                    返回电影列表页面
                </Button>
               { this.renderInfo()}
            </div>
        )
    }
    goback=()=>{
        this.props.history.go(-1)
    }
    renderInfo=()=>{
        if(this.state.isloading){
            return  <Spin tip="Loading...">
                        <Alert
                        message="正在请求电影详情"
                        description="精彩内容稍后呈现"
                        type="info"
                        />
                    </Spin> 
        }else{
            return <div>
               <div style={{textAlign:"center"}}>
                    <h1 style={{fontSize:"30px"}}>{this.state.info.title}</h1>
                    <img src={this.state.info.images.small} alt=""/>
               </div>
                      <p style={{textIndent:'2em',lineHeight:"30px"}}>{this.state.info.summary}</p>
            </div>
        }
    }

}