import React, { Component } from 'react';
import { List } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import { Container, TodoContainer } from './DashboardStyles';
import { getTodos } from './Actions/DashboardActions';

class Dashboard extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getTodos());
	}

	render() {
		const { todos } = this.props;
		return (
			<Container>
				<TodoContainer>
					<List
						header={<div>TODOS</div>}
						footer={<div>Add Todo Form</div>}
						bordered
						dataSource={todos}
						renderItem={item => (<List.Item>{item.get('name')}</List.Item>)}
					/>
				</TodoContainer>
			</Container>
		);
	}
}

Dashboard.propTypes = {
	todos: PropTypes.instanceOf(ImmutableList).isRequired,
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	todos: state.getIn(['dashboard', 'todos']),
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
