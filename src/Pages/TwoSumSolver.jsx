// src/pages/TwoSumSolver.jsx
import React, { useState } from "react";
import { Input, Button, Typography, Alert, Space, Splitter, Row, Col } from "antd";
import Container from "../components/Container";

const TwoSumSolver = () => {
	const [nums, setNums] = useState("");
	const [target, setTarget] = useState("");
	const [result, setResult] = useState(null);
	const [error, setError] = useState("");

	const handleSolve = () => {
		try {
			setError("");
			const numArray = JSON.parse(nums);
			const numTarget = parseInt(target, 10);

			if (!Array.isArray(numArray)) throw new Error("Input must be a valid array.");
			if (isNaN(numTarget)) throw new Error("Target must be a number.");
			if (hasDuplicates(numArray)) {
				throw new Error("Input array must not contain duplicate numbers.");
			}

			const map = new Map();
			for (let i = 0; i < numArray.length; i++) {
				const complement = numTarget - numArray[i];
				if (map.has(complement)) {
					setResult([map.get(complement), i]);
					return;
				}
				map.set(numArray[i], i);
			}

			throw new Error("No valid two indices found.");
		} catch (err) {
			setResult(null);
			setError(err.message);
		}
	};

	const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

	return (
		<Container>
			<Typography.Title underline={true}>Two Sum Solver</Typography.Title>
			<Splitter style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", minHeight: "200px", background: "#fff" }}>
				<Splitter.Panel defaultSize="40%" min="40%" max="70%">
					<Row justify={"center"} gutter={[0, 0]} style={{ height: "100%" }} align={"middle"}>
						<Col span={20}>
							<Typography.Title level={3}>Two Sum Solver</Typography.Title>
							<Space direction="vertical" style={{ width: "100%" }}>
								<Input placeholder="Enter array e.g. [2,7,11,15]" value={nums} onChange={(e) => setNums(e.target.value)} />
								<Input placeholder="Enter target e.g. 9" value={target} onChange={(e) => setTarget(e.target.value)} />
								<Button type="primary" block onClick={handleSolve}>
									Solve
								</Button>
							</Space>
						</Col>
					</Row>
				</Splitter.Panel>
				<Splitter.Panel>
					<Row justify={"center"} gutter={[0, 0]} style={{ height: "100%" }} align={"middle"}>
						<Col span={20}>
							{result && <Alert type="success" message={`Indices found: [${result[0]}, ${result[1]}]`} showIcon />}
							{error && <Alert type="error" message="Error" description={error} showIcon />}
						</Col>
					</Row>
				</Splitter.Panel>
			</Splitter>
		</Container>
	);
};

export default TwoSumSolver;
