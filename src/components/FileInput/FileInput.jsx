import { PermMedia } from '@mui/icons-material';
import { Button, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

const FileInput = React.forwardRef((props, ref) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : props.placeholder);
    };
    return (

        <OutlinedInput
            {...props}
            ref={ref}
            value={fileName}
            autoComplete='off'
            type='text'
            readOnly
            endAdornment={
                <InputAdornment position="end">
                    <input
                        id={`${props.id}_upload`}
                        type={props.type}
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor={`${props.id}_upload`}>
                        <Button variant="contained" component="span" startIcon={<PermMedia />}>
                            Sube imagen
                        </Button>
                    </label>
                </InputAdornment>
            }
        />
    );
})

export default FileInput;