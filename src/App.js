import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Login, SignUp, ProjectsList, Dashboard, ProjectDetails } from "./pages";
import { CssBaseline } from '@mui/material';
import { MyUserProvider } from './context/UserContext';

import theme from "./theme/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyUserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard"
              element={<Dashboard />}>
              <Route index element={<Navigate to="projects" replace />} />
              <Route path="projects" element={<ProjectsList />} />
              <Route path="details" element={<ProjectDetails />} />
            </Route>
          </Routes>
        </MyUserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
