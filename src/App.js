import { ThemeProvider } from '@mui/material/styles';
import { SignUp } from "./pages";
import theme from "./theme/theme";
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignUp />
    </ThemeProvider>
  );
}

export default App;
