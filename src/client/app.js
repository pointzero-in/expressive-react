import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Input, Grid, Button, Icon, Checkbox, Form, Image } from 'semantic-ui-react';

const TODOS = [
	{
		id: 1,
		name: 'Install ExpressJS for server',
		status: 'PENDING'
	},
	{
		id: 2,
		name: 'Install WebPack for frontend',
		status: 'PENDING'
	},
	{
		id: 3,
		name: 'Implement React',
		status: 'PENDING'
	},
	{
		id: 4,
		name: 'Create MongoDB as instance',
		status: 'PENDING'
	},
];


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: TODOS,
			newTodo: {
				id: 0,
				name: '',
				status: 'PENDING',
			}
		}
	}

	addTodo = (e) => {
		e.preventDefault();
		this.setState(prevState => {
			if (prevState.newTodo.status === 'EDIT') {
				const todos = _.cloneDeep(prevState.todos);
				_.each(todos, todo => {
					if (todo.id === prevState.newTodo.id) {
						todo.name = prevState.newTodo.name;
					}
				});
				return {
					todos,
					newTodo: {
						id: 0,
						name: '',
						status: 'PENDING',
					}
				}
			}
			return {
				todos: [
					...prevState.todos,
					{
						...prevState.newTodo,
						id: prevState.todos.length + 1,
						status: 'PENDING'
					}
				],
				newTodo: {
					...prevState.newTodo,
					status: 'PENDING',
					name: ''
				}
			}
		});
	}

	completeTodo(id, checked) {
		const todos = _.each(_.cloneDeep(this.state.todos), todo => {
			if (todo.id === id && this.state.newTodo.id !== id) {
				todo.status = checked ? 'COMPLETE' : 'PENDING';
			}
			return todo;
		});
		this.setState({todos});
	}

	removeTodo(todoId) {
		const todos = [];
		_.each(this.state.todos, todo => {
			if (todo.id !== todoId || this.state.newTodo.id === todoId) {
				todos.push(todo);
			}
		});
		this.setState({todos});
	}

	render() {
		const todos = _.cloneDeep(this.state.todos);
		return (
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
				<div style={{margin: 'auto', maxWidth: '600px', padding: '40px 0', width: '100%'}}>
						<Image centered size="small" src="/static/images/logo.png" alt=""/>
						<Segment.Group>
							{
								_.map(todos, (todo, index) => (
									<Segment key={index}>
										<Grid>
											<Grid.Column width={12}>
												<Checkbox
													checked={todo.status === 'COMPLETE'}
													style={todo.status === 'COMPLETE' ? {textDecoration: 'line-through'} : {}}
													label={todo.name}
													onChange={(e, {checked}) => this.completeTodo(todo.id, checked)}
												/>
											</Grid.Column>
											<Grid.Column width={2} style={{color: '#1a69a4'}}>
												<Icon
													name="pencil"
													style={{cursor: 'pointer'}}
													disabled={todo.status === 'COMPLETE'}
													onClick={() => {
															if (todo.status === 'COMPLETE') {
																return false;
															}
															this.setState({
																newTodo: {
																	id: todo.id,
																	name: todo.name,
																	status: 'EDIT',
																}
															})
														}
													}
												/>
											</Grid.Column>
											<Grid.Column width={2} style={{color: '#db2828'}}>
												<Icon style={{cursor: 'pointer'}} onClick={() => this.removeTodo(todo.id)} name="close" />
											</Grid.Column>
										</Grid>
									</Segment>
								))
							}
							<Segment>
								<Form onSubmit={this.addTodo}>
									<Grid>
										<Grid.Column width={13}>
												<Input
													onChange={(e, {value}) => this.setState(prevState => ({
															newTodo: {...prevState.newTodo, name: value}
														})
													)}
													value={this.state.newTodo.name}
													placeholder='Add a new todo...'
													fluid
												/>
										</Grid.Column>
										<Grid.Column width={3}>
											<Button type="submit" fluid primary>Add</Button>
										</Grid.Column>
									</Grid>
								</Form>
							</Segment>
						</Segment.Group>
				</div>
			</div>
		);
	}
}

export default App;
