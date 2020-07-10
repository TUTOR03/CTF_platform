import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component{
	constructor(props){
		super(props)
		this.MakeLogout = this.MakeLogout.bind(this)
		this.SendFlag = this.SendFlag.bind(this)
		this.InputChange = this.InputChange.bind(this)
		this.state={
			flag:'',
			flag_placeholder:'Флаг',
			flag_status:'no_flag'
		}
	}
	InputChange(event){
		event.preventDefault()
		this.setState({[event.target.name]:event.target.value})
		this.setState({errors:false})
	}
	MakeLogout(event){
		event.preventDefault()
		const endpoint = '/api/logout'
		let options={
			method:'POST',
			headers:{
				Authorization:`Token ${localStorage.token}`
			}
		}
		fetch(endpoint,options)
		.then(response => response.text())
		.then(responseData =>{
			localStorage.removeItem('token')
			let prom = new Promise((resolve)=>{
				this.props.UpdateToken()
				resolve('')
			})
			prom.then(()=>{
				console.log('called')
				this.props.GetTasks()
			})
		})
		.catch(error => console.log('Error: ' + error))
	}
	SendFlag(event){
		event.preventDefault()
		const endpoint = '/api/send_flag'
		let formdata = new FormData()
		formdata.append('flag',this.state.flag)
		let options={
			method:'POST',
			body:formdata,
			headers:{
				Authorization:`Token ${localStorage.token}`
			}
		}
		fetch(endpoint, options)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({
				flag:'',
				flag_placeholder:`${responseData.answer}`,
				flag_status:responseData.status ? 'good_flag':'bad_flag'
			},()=>{setTimeout(()=>{this.setState({flag_placeholder:'Флаг', flag_status:'no_flag'})},1000*4);setTimeout(()=>{this.props.GetTasks()},1000*5)})
		})
		.catch(error => console.log('Error: ' + error))
	}
	render(){
		return(
			<nav className="navbar navbar-expand-md navbar-imerald bg-imerald">
				<Link to='/site' className="navbar-brand">IBCTF Junior</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse w-100 justify-content-between" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to='/site' className="nav-link">Задания</Link>
						</li>
						<li className="nav-item">
							<Link to='/site/scoreboard' className="nav-link">Результаты</Link>
						</li>
					</ul>
					{this.props.isAuth ?
						<form className="form-inline" onSubmit={this.SendFlag}>
							<input className={`form-control mr-3 ${this.state.flag_status}`} type="search" name='flag' placeholder={this.state.flag_placeholder} value={this.state.flag} onChange={this.InputChange}/>
							<button type="button" onClick={this.MakeLogout} className="btn btn-danger mr-3">Выход</button>
						</form>
					:
						<form className="form-inline">
							<Link to='/site/login'><button type="button" className="btn btn-outline-light mr-3">Вход</button></Link>
	    					<Link to='/site/register'><button type="button" className="btn btn-outline-light">Регистрация</button></Link>
						</form>
					}
				</div>
			</nav>
		);
	}
}

export default NavBar;