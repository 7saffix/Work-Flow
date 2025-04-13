import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./Layout/MainLayout";
import CreatePage from "./pages/CreatePage";
import NewTasksPage from "./pages/NewTasksPage";
import ProgressPage from "./pages/ProgressPage";
import CompletePage from "./pages/CompletePage";
import CanceledPage from "./pages/CanceledPage";
import useAuthStore from "./store/authStore";

const App = () => {
  const { token } = useAuthStore();

  return (
    <Routes>
      {token ? (
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/all-new" element={<NewTasksPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/completed" element={<CompletePage />} />
          <Route path="/canceled" element={<CanceledPage />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </>
      )}
    </Routes>
  );
};

// const App = () => {
//   if (localStorage.getItem("token")) {
//     return (
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<DashboardPage />} />
//           <Route path="/create" element={<CreatePage />} />
//           <Route path="/all-new" element={<NewTasksPage />} />
//           <Route path="/progress" element={<ProgressPage />} />
//           <Route path="/completed" element={<CompletePage />} />
//           <Route path="/canceled" element={<CanceledPage />} />
//         </Route>
//       </Routes>
//     );
//   } else {
//     return (
//       <Routes>
//         <Route path="/" element={<Navigate to="/signin" />} />
//         <Route path="/signin" element={<SigninPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Routes>
//     );
//   }
// };

export default App;
