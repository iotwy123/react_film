import React from 'react'
import { Layout, Menu,  Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
//导入路由相关组件
import {Link,Route,Switch} from 'react-router-dom'
import MovieList from './MoveList.jsx'
import MovieDetail from './MovieDetail.jsx'

export default class MovieContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:""
        }
    }
    render(){
        return(
            <Layout style={{height:'100%'}}>
            <Sider width={200} style={{ background: '#fff',flex:1 }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[window.location.hash.split('/')[2]]}
               
                style={{ height: '100%', borderRight: 0 }}
              >
                  <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
                  <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                  <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
                  
              </Menu>
            </Sider>
            <Layout style={{ paddingLeft: '1px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 10,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                  {/* 在匹配路由规则的时候提供了两个参数， */}
                  {/* 如果想要从路由规则中，提取参数，需要试用this.props.match.params */}
                  {/* 为路由启用exact精确匹配模式，也会从上到下把路由都匹配一次 */}

                <Switch >
                    {/* 匹配到上边的路由后就不在此进行匹配 */}
                     <Route path="/movie/detail/:id" component={MovieDetail}></Route>
                    <Route path="/movie/:type/:page" component={MovieList}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}