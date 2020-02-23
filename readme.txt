//react项目
 
 1. 获取页面路由参数
         <h1>MovieList---{this.props.match.params.type}----{this.props.match.params.page}</h1> 
 2. 样式模块化，改造webpack的配置文件。修改sass为模块化，css不为模块化。
        import styles from './css/app.scss'  //导入样式
        <div className={styles.logo}/> //使用模块化样式
    注意：class属性变成了className   
 3.直接style修改样式：
        style={{ height: '100%', borderRight: 0 }}
 4.获取url地址
 console.log(window.location.hash.split('/')[1])   下标1是第一层路由，0为#。以此类推

 5.获取数据，fetch请求   fetch是基于promise封装的
    一般在componentWillMount生命周期函数里调用fetch
     fetch('http://localhost:4000/api/get')
        .then(r=>{
            //第一个.then中获取不到数据，可以拿到response对象，可以调用response.json拿到新数据
            console.log(r)
            return r.json()
        })
        .then(data=>{
            //最终数据
            console.log(data)
        })
//fetch访问不同域名会有跨域问题
  使用fetchjsonp请求，需要装包 用法和浏览器内置fetch完全兼容
   fetchjsonp('http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
//一个好看的动画效果
&:hover{
        transform: rotate(1deg) scale(1.5);
    }

//了解下这个钩子函数
 componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState(
            {
                isloading:true, //又要重新加载数据
                nowPage:parseInt(nextProps,params.page)||1, //获取第几页数据
                movieType:nextProps.params.type,//电影类型
                total:0

            }
        )
    }
//使用路由中的switch能够指定，前面的路由规则优先匹配到，后续的路由放弃匹配
 
//切换路由  跳转页面
this.props.history.push('/movie/detail/'+this.props.id)   

//1.fetch。 路由，  组件，  isloading，给个加载中的提示，