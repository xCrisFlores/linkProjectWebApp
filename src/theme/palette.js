const common = {
    black:'#001E2B',
    white:'#f5f5f5',
    grey:'#BFCAC9',
}

const grey = {
    main: '#BFCAC9',
    light: '#d5d5d5',
    dark: '#787878',
}

const primary  = {
    main: '#192444',
    light: '#729ea1',
    dark: common.black,
    contrastText:common.white
}

const secondary = {
    main: '#95190c',
    light: '#d84a3b',
    dark: '#670607',
    contrastText: common.white,
}

const info = {
    main: '#d7a840',
    light: '#f2cb6e',
    dark: '#a0782c',
    contrastText:common.black
}

const background = {
    paper: common.white,
    default: grey.light
}

const palette = {
    common,
    primary,
    secondary,
    info,
    grey,
    background
}

export default palette;  
