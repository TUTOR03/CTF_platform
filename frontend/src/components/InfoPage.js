import React, {Component} from 'react'

class InfoPage extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='container'>
				<h1>Полезные ссылки</h1>
				<div className='row justify-content-center'>
					<div className='col-md-10'>
						<h3><a href='https://course.ugractf.ru/'>Купсы от [team Team]</a></h3>
					</div>
				</div>
			</div>
		);
	}
}

export default InfoPage;