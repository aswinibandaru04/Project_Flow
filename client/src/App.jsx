import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

import Workspace from "./pages/workspace/Workspace";
import WorkspaceDetails from "./components/workspace/WorkspaceDetails";
import ProjectDetails from "./pages/project/ProjectDetails";
import BoardPage from "./pages/kanban/KanBanBoard";
import MemberDashboard from "./pages/member/MemberDashboard";
import MyTasks from "./pages/member/MyTasks";
import MyBoard from "./pages/member/MyBoard";
import Profile from "./pages/member/Profile";
import InviteMembers from "./pages/workspace/InviteMembers";
// import Analytics from "./pages/analytics/Analytics";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        }
      />

        <Route
  path="/workspace/:id"
  element={
    <ProtectedRoute>
      <WorkspaceDetails />
    </ProtectedRoute>
  }
/>
       <Route
  path="/project/:id"
  element={
    <ProtectedRoute>
      <ProjectDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/board"
  element={
    <ProtectedRoute>
      <BoardPage />
    </ProtectedRoute>
  }
/>

<Route
    path="/member-dashboard"
    element={<MemberDashboard />}
/>

<Route path="/my-tasks" element={<MyTasks />} />

<Route
  path="/my-board"
  element={
    <ProtectedRoute>
      <MyBoard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/invite-members"
  element={
    <ProtectedRoute>
      <InviteMembers />
    </ProtectedRoute>
  }
/>


      {/* <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      /> */}
     
    </Routes>
  );
}

export default App;