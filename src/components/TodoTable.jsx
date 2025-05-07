// components/TodoTable.jsx
import { useRef, useState } from "react";
import { Table, Tag, Button, Space, Popconfirm, Input } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const TodoTable = ({ todosList, onEdit, onDelete, onMarkComplete }) => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);

	const columns = [
		{
			title: "Task Name",
			dataIndex: "task",
			key: "task",
			width: "45%",
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
				<div style={{ padding: 8 }}>
					<Input
						ref={searchInput}
						placeholder="Search task"
						value={selectedKeys[0]}
						onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => {
							confirm();
							setSearchedColumn("name");
						}}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<div>
						<Button
							type="primary"
							onClick={() => {
								confirm();
								setSearchedColumn("name");
							}}
							icon={<SearchOutlined />}
							size="small"
							style={{ width: 90, marginRight: 8 }}>
							Search
						</Button>
						<Button
							onClick={() => {
								clearFilters();
								setSearchText("");
								confirm();
							}}
							size="small"
							style={{ width: 90 }}>
							Reset
						</Button>
					</div>
				</div>
			),
			filterIcon: (filtered) => <SearchOutlined size={"large"} />,
			onFilter: (value, record) => record.task.toLowerCase().includes(value.toLowerCase()),
			render: (text) => (searchedColumn === "task" ? <Highlighter>{searchText}</Highlighter> : text),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			filters: [
				{ text: "All", value: "all" }, // handled in `onFilter`
				{ text: "Pending", value: "pending" },
				{ text: "Completed", value: "completed" },
			],
			onFilter: (value, record) => {
				if (value === "all") return true;
				return record.status === value;
			},
			render: (status) => <Tag color={status === "completed" ? "green" : "orange"}>{status.toUpperCase()}</Tag>,
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<Space>
					<Button onClick={() => onEdit(record)} size="large">
						<EditOutlined />
					</Button>

					<Popconfirm title="Are you sure to delete this task?" onConfirm={() => onDelete(record.id)} okText="Yes" cancelText="No">
						<Button danger size="large">
							<DeleteOutlined />
						</Button>
					</Popconfirm>

					{!record.completed && (
						<Button onClick={() => onMarkComplete(record.id)} size="large">
							<CheckOutlined />
						</Button>
					)}
				</Space>
			),
		},
	];

	return <TableUI rowKey={(record) => record.id} dataSource={todosList} columns={columns} pagination={false} scroll={{ y: 400 }} />;
};

export default TodoTable;

const TableUI = styled(Table)`
	.ant-table-filter-trigger {
		color: #000;
		font-size: 16px;
	}
`;

const Highlighter = styled.div`
	background: #ffc069;
`;
