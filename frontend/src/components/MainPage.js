import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class MainPage extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.UpdateToken()
		this.props.GetTasks()
	}
	render(){
		return(
			!this.props.is_loading ?
			<div className='container mt-5'>
				{this.props.tasks.map((ob,idx)=>{return(
					ob.tasks.length!=0 ? 
					(<div className='row mb-4' key={idx}>
						<div className='col-sm-12'>
							<h1 className='task-type'>{ob.task_type}</h1>
						</div>
						{ob.tasks.map((data,id)=>{return(
							<div className='col-lg-3 col-md-4 col-sm-6 mt-3' key={id}>
								<div className='card task-card'>
									<Link to={`/site/task/${data.slug}`}>
										<div className={`card-header ${data.solved ? 'crossed-text':''}`}>
											{data.title}
										</div>
									</Link>
									<div className={`card-body text-center ${data.solved ? 'crossed-text':''}`}>
										<h4>{data.cost}</h4>
									</div>
								</div>
							</div>
						)})}
					</div>):''
				)})}
			</div>
			:
			''
		);
	}
}

export default MainPage;