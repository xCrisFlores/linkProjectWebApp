import { Box, Chip, MenuItem, Select } from '@mui/material';
import React from 'react'

const MultiSelectInput = React.forwardRef((props, ref) => {
    const [selectedValues, setSelectedValues] = React.useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event; // This is the same as const value = event.target.value;
        setSelectedValues(value);
    };

    return (
        <Select
            {...props}
            multiple
            ref={ref}
            value={selectedValues}
            onChange={handleChange}
            autoComplete='off'
            displayEmpty
            renderValue={(selectedValues) =>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} >
                    {
                        selectedValues.map((value) => (
                            <Chip key={value.id} label={value.label} />
                        ))
                    }
                </ Box>
            }
        >
            {props.values.map((value, index) => (
                <MenuItem key={index} value={value}>
                    {value.label}
                </MenuItem>
            ))}
        </Select>
    )
});

export default MultiSelectInput;
