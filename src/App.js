import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Login, SignUp, ProjectsList, Dashboard, ProjectDetails, MyProject } from "./pages";
import { CssBaseline } from '@mui/material';
import { UserProvider } from './context/UserContext';
import theme from "./theme/theme";
import { AuthWrapper, ErrorView } from './components';
import ProjectForm from './pages/ProjectForm/ProjectForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <AuthWrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="dashboard"
                element={<Dashboard />}>
                <Route index element={<Navigate to="projects" replace />} />
                <Route path="projects" element={<ProjectsList />} />
                <Route path="create-project" element={<ProjectForm/>} />
                <Route path="details" element={<ProjectDetails />} />
                <Route path="my_project" element={<MyProject />} />
                <Route path="requests" element={<ErrorView title='¡Ups! Esta página sigue en construcción.'/>} />
              </Route>
            </Routes>
          </AuthWrapper>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
