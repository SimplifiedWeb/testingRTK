import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import DisplayTasks from "./DisplayTasks";
import InputTasks from "./InputTasks";
import "./task.css";

const TasksHome = () => {
	return (
		<>
			<div className="redux-example">
				<h3 className="redux-example__title">
					Understanding RTK and RTK Query
				</h3>
				<Provider store={store}>
					<div className="redux-example__content">
						<InputTasks />
						<DisplayTasks />
					</div>
				</Provider>
			</div>
		</>
	);
};

export default TasksHome;
