//项目打包文件
import React from 'react';
import {HashRouter,Route,Link} from 'react-router-dom'
import { Layout, Menu } from 'antd'; //导入需要的ant-design组件
const { Header, Content, Footer } = Layout;
import styles from './css/app.scss'  //导入样式
import AboutContainer from './components/about/AboutContainer.jsx'
import HomeContainer from './components/home/HomeContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:''
        }
    }
    componentWillMount(){
        //拿到路由地址信息
        console.log(window.location.hash.split('/')[1])
    }
    render() {
        return (
            <HashRouter>
            
               <Layout className="layout" style={{height:'100%'}}>
                    <Header>
                    <div className={styles.logo}/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={(window.location.hash.split('/')[1])}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home" >
                            <Link to="/home">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="movie">
                             <Link to="/movie/in_theaters/1">电影</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                              <Link to="/about">关于</Link>
                        </Menu.Item>
                    </Menu>
                    </Header>
                    {/* 中间内容区 */}
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 520 }}>
                           <Route path='/home' component={HomeContainer}></Route>
                           <Route path='/movie' component={MovieContainer}></Route>
                           <Route path='/about' component={AboutContainer}></Route>
                        </div>
                    </Content>
                    {/* 底部区域 */}
                    <Footer style={{ textAlign: 'center' }}>WY ©2020 Created </Footer>
                </Layout>,
            </HashRouter>
        )
    }
}