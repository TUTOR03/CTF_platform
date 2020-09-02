import React, {Component} from 'react'

class InfoPage extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-10'>
						<h1 className='info-title'>Полезные ссылки</h1>
						<h3><a href='https://course.ugractf.ru/' target='_blank'>Курсы от [team Team]</a></h3>
						<h3><a href='https://forkbomb.ru/' target='_blank'>Таски от SPBCTF</a></h3>
						<h3><a href='https://kmb.cybber.ru' target='_blank'>Курс молодого бойца CTF</a></h3>
						<h3><a href='https://github.com/ugractf' target='_blank'>UGRA CTF</a></h3>
						<h3><a href='http://innoctf.com/archive' target='_blank'>INNO CTF JUNIOR</a></h3>
						<h3><a href='https://olymp.innopolis.ru/ooui/information-security/archive/' target='_blank'>INNO CTF</a></h3>
					</div>
				</div>
			</div>
		);
	}
}

export default InfoPage;