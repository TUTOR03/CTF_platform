import React, {Component} from 'react'

class SingleTask extends Component{
	constructor(props){
		super(props)
		this.GetSingleTask = this.GetSingleTask.bind(this)
		this.GetImageURL = this.GetImageURL.bind(this)
		this.state={
			task:{},
			is_loading:true
		}
	}
	GetSingleTask(){
		this.setState({is_loading:true})
		const endpoint = `/api/tasks/${this.props.match.params.slug}`
		let options={
			method:'GET'
		}
		if(localStorage.token!=undefined){
			options.headers={
				Authorization:`Token ${localStorage.token}`
			}
		}
		fetch(endpoint, options)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({task:responseData},()=>{this.setState({is_loading:false})})
		})
		.catch(error => console.log('Error: ' + error))
	}
	GetImageURL(img_url){
		return '/' + img_url.slice(img_url.indexOf('media'));
	}
	componentDidMount(){
		this.GetSingleTask()
	}
	render(){
		let {task} = this.state 
		return(
			!this.state.is_loading ?
				<div className='container mt-5 single-task'>
					<div className='row'>
						<div className='col-lg-7 col-sm-12'>
							<h1 className={`font-weight-bold ${task.data.solved ? 'crossed-text':''}`}>{task.data.title}</h1>
							<h4 className={`font-weight-bold ${task.data.solved ? 'crossed-text':''}`}>{task.data.cost}</h4>
							<h3><div dangerouslySetInnerHTML={{ __html: task.data.text }}/></h3>
							{task.files.map((ob,idx)=>{return(
								<h4 key={idx}><a href={this.GetImageURL(ob)} download>Файл</a></h4>
							)})}
						</div>
					</div>
				</div>
			:
			''
		);
	}
}

export default SingleTask;