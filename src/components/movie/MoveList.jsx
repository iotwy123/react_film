import React from 'react'
import { Spin, Alert } from 'antd';
import fetchjsonp from 'fetch-jsonp'
import MovieItem from './MovieItem.jsx'
import { Pagination } from 'antd';
export default class MovieList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:"",
            movies:[], //电影列表
            nowPage:parseInt(props.match.params.page)||1, //当前展示第几页数据
            pageSize:8, //显示多少条数据
            total:0, //当前电影分类下，总共有多少条数据
            isloading:true, //true正在加载。
            movieType:props.match.params.type, //保存下要获取的电影类型 
        }
    }
    componentWillMount(){
        this.loadMovieListByTypeAndPage()
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        //没当地址栏变化了，充值state中的参数项，重置完毕后，我们可以重新发送数据请求
        this.setState(
            {
                isloading:true, //又要重新加载数据
                nowPage:parseInt(nextProps.match.params.page)||1, //获取第几页数据
                movieType:nextProps.match.params.type,//电影类型

            },function(){
                this.loadMovieListByTypeAndPage()
            }
        )
    }
    render(){
        return(
            <div>
                 {this.renderList()}
            </div>
        )
    }
    
    loadMovieListByTypeAndPage=()=>{
        //根据电影类型和页码，获取电影数据
        //开始获取数据的索引
        const start=this.state.pageSize*(this.state.nowPage-1)
        const url=`http://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`
        fetchjsonp(url)
        .then(response=>response.json())
        .then(data=>{
           this.setState({
                isloading:false,  //loading效果隐藏
               movies:data.subjects, //为电影列表重新赋值
               total:data.total,     //总条数绑定到state上
           })
        })
    }

    //渲染电影列表的方法
    renderList=()=>{
        if(this.state.isloading){
            //正在加载中
            return  <Spin tip="Loading...">
                        <Alert
                        message="正在请求电影内容"
                        description="精彩内容稍后呈现"
                        type="info"
                        />
                    </Spin>
        }else{
            //加载完成
            return <div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.movies.map(item=>{
                    return <MovieItem {...item} key={item.id} history={this.props.history} ></MovieItem>
                })}
            </div>
            <Pagination defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.pageChanged}/>
            </div>
        }
    }
    pageChanged=(page)=>{
        //页码改变的时候去加载新一页的数据
        // window.Location.href='#/movie/'+this.state.movieType+'/'+page
        this.props.history.push('/movie/'+this.state.movieType+'/'+ page)
    }
}
//在react中可以试用fetch获取