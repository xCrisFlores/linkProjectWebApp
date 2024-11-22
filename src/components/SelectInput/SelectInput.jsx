import { MenuItem, Select } from '@mui/material';
import React from 'react'

const SelectInput = React.forwardRef((props, ref) => {
    const [currentItem, setCurrentItem] = React.useState('');

    const handleChange = (event) => {
        const { target: { value } } = event;
        console.log("🚀 ~ handleChange ~ value:", value)
        setCurrentItem(value);
    };

    return (
        <Select
            {...props}
            ref={ref}
            value={currentItem}
            onChange={handleChange}
            autoComplete='off'
            displayEmpty
            renderValue={value =>  value.label || props.placeholder}
        >
            {
                props.values.map((value, index) =>
                    <MenuItem
                        key={index}
                        value={value}>
                        {value.label}
                    </MenuItem>
                )
            }

        </Select>
    )
});

export default SelectInput;
