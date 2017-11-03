import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Input, Grid, Button, Icon, Checkbox, Form } from 'semantic-ui-react';

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
		}
	}

	addTodo = (e) => {
		e.preventDefault();
		this.setState(prevState => {
			return {
				todos: [
					...prevState.todos,
					{
						id: prevState.todos.length + 1,
						name: this.input,
						status: 'PENDING',
					}
				]
			}
		});
	}

	removeTodo(todoId) {
		const todos = [];
		_.each(this.state.todos, todo => {
			if (todo.id !== todoId) {
				todos.push(todo);
			}
		});
		this.setState({todos});
	}

	render() {
		const todos = _.cloneDeep(this.state.todos);
		return (
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
				<div style={{margin: 'auto', width: '600px', padding: '40px 0'}}>
						<Segment.Group>
							{
								_.map(todos, (todo, index) => (
									<Segment key={index}>
										<Grid>
											<Grid.Column width={12}>
												<Checkbox label={todo.name} />
											</Grid.Column>
											<Grid.Column width={2} style={{cursor: 'pointer', color: '#1a69a4'}}>
												{/*<Icon name="pencil" />*/}
											</Grid.Column>
											<Grid.Column width={2} style={{cursor: 'pointer', color: '#db2828'}}>
												<Icon onClick={() => this.removeTodo(todo.id)} name="close" />
											</Grid.Column>
										</Grid>
									</Segment>
								))
							}
							<Segment>
								<Form onSubmit={this.addTodo}>
									<Grid>
										<Grid.Column width={13}>
												<Input onChange={(e, {value}) => this.input = value} fluid placeholder='Add a new todo...' />
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
