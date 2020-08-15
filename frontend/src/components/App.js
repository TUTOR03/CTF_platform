import React, {Component} from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import MainPage from './MainPage'
import NavBar from './NavBar'
import Login from './Login'
import Register from './Register'
import SingleTask from './SingleTask'
import ScoreBoard from './ScoreBoard'

class App extends Component{
	constructor(props){
		super(props)
		this.UpdateToken = this.UpdateToken.bind(this)
		this.GetTasks = this.GetTasks.bind(this)
		this.state = {
			isAuth:false,
			tasks:[],
			is_loading:true
		}
	}
	GetTasks(){
		const endpoint = '/api/tasks'
		let options={
			method:'GET'
		}
		if(this.state.isAuth){
			options.headers={
				Authorization:`Token ${localStorage.token}`
			}
		}
		fetch(endpoint, options)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({tasks:responseData},()=>{this.setState({is_loading:false})})
		})
		.catch(error => console.log('Error: ' + error))
	}
	UpdateToken(){
		this.setState({isAuth: localStorage.token ? true:false},()=>{this.GetTasks()})
	}
	componentDidMount(){
		this.setState({is_loading:true})
		this.UpdateToken()
	}
	render(){
		return(
				<BrowserRouter>
					<NavBar isAuth={this.state.isAuth} UpdateToken={this.UpdateToken} GetTasks={this.GetTasks}/>
					<Switch>
						<Route exact path='/site/'render={() => <MainPage is_loading={this.state.is_loading} tasks={this.state.tasks} isAuth={this.state.isAuth} GetTasks={this.GetTasks} UpdateToken={this.UpdateToken}/>} />
						<Route path='/site/task/:slug' render={({match})=><SingleTask isAuth={this.state.isAuth} match={match}/>}/>
						<Route exact path='/site/login'render={() => <Login isAuth={this.state.isAuth} UpdateToken={this.UpdateToken}/>} />
						<Route exact path='/site/register'render={() => <Register isAuth={this.state.isAuth} UpdateToken={this.UpdateToken}/>} />
						<Route exact path='/site/scoreboard' render={() => <ScoreBoard/>}/>
					</Switch>
				</BrowserRouter>
		);
	}
}

export default App;