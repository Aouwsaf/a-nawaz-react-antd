import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, Flex } from "antd";
import { UnorderedListOutlined, CheckSquareOutlined } from "@ant-design/icons";
const { Option } = Select;

const TaskForm = ({ onSubmit, updateClicked, taskClickedToUpdate, handleCancel }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (updateClicked && taskClickedToUpdate) {
			form.setFieldsValue({
				task: taskClickedToUpdate.task,
				status: taskClickedToUpdate.status,
			});
		}
	}, [updateClicked, taskClickedToUpdate, form]);

	const handleFinish = (values) => {
		onSubmit(values);
		form.resetFields();
	};

	const resetForm = () => {
		form.resetFields();
		handleCancel();
	};

	return (
		<Row justify={"center"} gutter={[0, 0]} style={{height: "100%"}} align={"middle"}>
			<Col span={20}>
				<Form form={form} layout="vertical" onFinish={handleFinish}>
					<Form.Item label="Task Name" name="task" rules={[{ required: true, message: "Please enter a task name" }]}>
						<Input placeholder="Enter task name" size="large" prefix={<UnorderedListOutlined />} />
					</Form.Item>
					<Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}>
						<Select placeholder="Select status" size="large" prefix={<CheckSquareOutlined />}>
							<Option value="pending">Pending</Option>
							<Option value="completed">Completed</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Flex gap={15} vertical>
							<Button type="primary" htmlType="submit" size="large" block>
								{updateClicked ? "Update Task" : "Add Task"}
							</Button>
							{updateClicked && (
								<Button size="large" block onClick={resetForm}>
									Cancel Update
								</Button>
							)}
						</Flex>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default TaskForm;
