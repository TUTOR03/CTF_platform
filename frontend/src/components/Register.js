import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Register extends Component{
	constructor(props){
		super(props)
		this.InputChange = this.InputChange.bind(this)
		this.MakeRegister = this.MakeRegister.bind(this)
		this.state={
			username:'',
			password:'',
			errors:false
		}
	}
	InputChange(event){
		event.preventDefault()
		this.setState({[event.target.name]:event.target.value})
		this.setState({errors:false})
	}
	MakeRegister(event){
		event.preventDefault()
		const endpoint = '/api/register'
		let formdata = new FormData()
		formdata.append('username', this.state.username);
		formdata.append('password', this.state.password);
		let options = {
			method:'POST',
			body:formdata,
		}
		fetch(endpoint, options)
		.then(response =>{
			if(response.ok){
				response.json().then(responseData =>{
					localStorage.setItem('token', responseData.token)
					this.props.UpdateToken()
				}).catch(error => console.log('Error: ' + error))
			}
			else{
				this.setState({errors:true})
			}
		})
	}
	render(){
		return(
		this.props.isAuth ? (<Redirect to="/site"/>) : (
			<div className="container mt-3" id="AuthLoginContainer">
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-12" id="AuthLoginForm">
		                <h1 className="font-weight-bold">Регистрация</h1>
		                <form onSubmit={this.MakeRegister}>
		                    <div className="form-group">
		                    	<input type="text" name="username" className={`form-control ${this.state.errors ? 'is-invalid':''}`} placeholder="Логин" onChange={this.InputChange} value={this.state.username}/>
		                    	<div className="invalid-feedback">Неверный Логин</div>
		                    </div>
		                    <div className="form-group">
		                    	<input type="password" name="password" className={`form-control ${this.state.errors ? 'is-invalid':''}`} placeholder="Пароль" onChange={this.InputChange} value={this.state.password}/>
		                    	<div className="invalid-feedback">Неверный Пароль</div>
		                    </div>
		                    <div className="form-group">
	                           <button type="submit" className="btn btn-imerald">Зарегистрироваться</button>
		                    </div>
		                </form>
	               	</div>	
				</div>
			</div>
			)
		);
	}
}

export default Register;