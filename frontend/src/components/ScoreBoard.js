import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ScoreBoard extends Component{
	constructor(props){
		super(props)
		this.GetScoreBoard = this.GetScoreBoard.bind(this)
		this.state = {
			scoreboard:[],
			is_loading:true
		}
	}
	GetScoreBoard(){
		const endpoint = '/api/scoreboard'
		let options={
			method:'GET'
		}
		fetch(endpoint, options)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({scoreboard:responseData.scoreboard, is_loading:false})
		})
		.catch(error => console.log('Error: ' + error))
	}
	componentDidMount(){
		this.GetScoreBoard()
	}
	render(){
		return(
			!this.state.is_loading ? 
				<div className='container mt-5'>
					<div className='row justify-content-center'>
						<div className='col-lg-8 col-sm-12'>
							<table className='table table-imerald'>
								<thead>
								    <tr>
								      <th scope="col">№</th>
								      <th scope="col">Очки</th>
								      <th scope="col">Пользователь</th>
								      <th scope="col">Последний флаг</th>
									</tr>
								</thead>
								<tbody>
									{this.state.scoreboard.map((ob,idx)=>{return(
										<tr key={idx}>
											<th scope="row">{idx+1}</th>
											<td>{ob.points}</td>
											<td>{ob.username}</td>
											<td>{ob.last_flag=='None'? '-':ob.last_flag}</td>
								    	</tr>
									)})}
							   	</tbody>
							</table>
						</div>
					</div>
				</div>
			:
			''
		);
	}
}

export default ScoreBoard;