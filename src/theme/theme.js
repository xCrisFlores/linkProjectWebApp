import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import getComponents from './components';

let theme = createTheme({
    palette,
    typography,
    spacing: 8,
    components: getComponents(createTheme({ palette, typography })),
});

theme = responsiveFontSizes(theme)

export default theme;
