// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoApp from "./Pages/TodoApp";
import TwoSumSolver from "./Pages/TwoSumSolver";
import MainLayout from "./components/MainLayout";
import MongoCode from "./Pages/MongoCode";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/two-sum" element={<TwoSumSolver />} />
          <Route path="/mongo-code" element={<MongoCode />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
