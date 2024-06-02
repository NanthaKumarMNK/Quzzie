import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import CreateQuestionPage from "./pages/CreateQuestionPage/CreateQuestionPage";
import SharePage from "./pages/SharePage/SharePage";
import DeletePage from "./pages/DeletePage/DeletePage";
import QuestionAnalysisPage from "./pages/QuestionAnalysisPage/QuestionAnalysisPage";
// import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route
                    path="/job-post"
                    element={<ProtectedRoute Component={JobPostPage} />}
                /> */}
          <Route
            path="/question_analysis/:quizId"
            element={<QuestionAnalysisPage />}
          />
          <Route path="/share" element={<SharePage />} />
          <Route path="/delete/:quizId" element={<DeletePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create_question" element={<CreateQuestionPage />} />
          <Route path="/question/:quizId" element={<QuestionPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
