import React, { useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'

const ButtonGroupInput = React.forwardRef((props, ref) => {
    const [currentValue, setCurrentValue] = useState({});

    const handleClick = (value) => {
        if (value === currentValue) {
            console.log("🚀 Esta pasando aqui");
            return;
        }
        setCurrentValue(value);
        const onChange = props.onChange;
        onChange && onChange(value);
    };

    return (
        <div ref={ref}>
            <input
                type="hidden"
                id={props.id}
                value={currentValue}
            />
            <ButtonGroup
                size='medium'
                fullWidth
            >
                {props.values.map((value, index) =>
                    <Button
                        key={index}
                        onClick={() => handleClick(value)}
                        variant={currentValue === value ? "contained" : "outlined"}>
                        {value.label}
                    </Button>
                )}
            </ButtonGroup>
        </div>
    );
})

export default ButtonGroupInput;