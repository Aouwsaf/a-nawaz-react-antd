import React, { useState, useEffect } from "react";
import { Splitter, Typography } from "antd";
import Container from "../components/Container";
import TaskForm from "../components/TaskForm";
import TodoTable from "../components/TodoTable";

const TodoApp = () => {
	const [todosList, setTodosList] = useState([]);
	const [taskToEdit, setTaskToEdit] = useState({});
	const [updateClicked, setUpdateClicked] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const storedTodos = localStorage.getItem("todosList");
		if (storedTodos) {
			setTodosList(JSON.parse(storedTodos));
		}
		setHasLoaded(true);
	}, []);

	useEffect(() => {
		if (hasLoaded) {
			localStorage.setItem("todosList", JSON.stringify(todosList));
		}
	}, [todosList, hasLoaded]);

	const addUpdateTodo = (newTask) => {
		if (updateClicked) {
			setTodosList((prev) => prev.map((task) => (task.id === taskToEdit.id ? newTask : task)));
			setUpdateClicked(false);
			setTaskToEdit({});
		} else {
			setTodosList((prev) => [...prev, { ...newTask, id: Date.now() }]);
		}
	};
	const cancelUpdateTodo = () => {
		setTaskToEdit({});
		setUpdateClicked(false);
	};

	const deleteTodo = (id) => {
		setTodosList(todosList.filter((todo) => todo.id !== id));
	};

	const markComplete = (id) => {
		setTodosList((prev) => prev.map((task) => (task.id === id ? { ...task, status: "completed", completed: true } : task)));
	};

	return (
		<Container>
			{/* <AddTodo onAdd={addTodo} /> */}
			<Typography.Title underline={true}>React Todo App</Typography.Title>
			<Splitter style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", minHeight: "400px", background: "#fff" }}>
				<Splitter.Panel defaultSize="40%" min="40%" max="70%">
					<TaskForm onSubmit={addUpdateTodo} taskClickedToUpdate={taskToEdit} updateClicked={updateClicked} handleCancel={cancelUpdateTodo} />
				</Splitter.Panel>
				<Splitter.Panel>
					<TodoTable
						todosList={todosList}
						onEdit={(task) => {
							setTaskToEdit(task);
							setUpdateClicked(true);
						}}
						onDelete={deleteTodo}
						onMarkComplete={markComplete}
					/>
				</Splitter.Panel>
			</Splitter>
		</Container>
	);
};

export default TodoApp;
