import React, { useEffect, useRef, useState } from "react"

// Define validation functions
const validateType = (value, expectedType) => typeof value === expectedType;
const validateLength = (value, minLength) => (value + "").length >= minLength;
const validateIncludes = (value, searchString) => value.includes(searchString);
const validateRegexMatch = (value, regexPattern) => new RegExp(regexPattern).test(value);

// Validation strategy object
const validationStrategies = {
    type: validateType,
    length: validateLength,
    includes: validateIncludes,
    match: validateRegexMatch,
};

const useForm = (fields = {}) => {
    const [formErrors, setFormErrors] = useState({});
    const [refsReady, setRefsReady] = useState(false);
    const inputRefs = useRef([]);

    // Actualizar inputRefs cuando fields cambia
    useEffect(() => {
        const currentLength = inputRefs.current.length;
        const fieldsLength = fields.length;
    
        // Para agregar referencias
        if (currentLength < fieldsLength) {
            for (let i = currentLength; i < fieldsLength; i++) {
                inputRefs.current[i] = React.createRef();
            }
        }

        // Para eliminar referencias
        else if (currentLength > fieldsLength){
            inputRefs.current = inputRefs.current.slice(0, fieldsLength);
        }

        setRefsReady(true);
    }, [fields]);

    useEffect(() => {
        if (refsReady) {
            initOutValues();
            setRefsReady(false); 
        }
    }, [refsReady]);

    const initOutValues = () =>
        inputRefs.current.forEach((ref) => {
            const input = ref.current.querySelector('input');
            if (input)
                input.value = '';
        })


    const getOutValues = () => {
        console.log("inputRefs.current", inputRefs.current)
        
        return fields.reduce((values, field, index) => {
            const input = inputRefs.current[index].current.querySelector('input');
            //console.log("🚀 ~ fields.reduce ~ input:", input)
            
            if (input)
                values[field.input.id] = input.value;

            return values;
        }, {});
    }

    const isFormValid = () => {
        const outValues = getOutValues();
        console.log("🚀 ~ isFormValid ~ outValues:", outValues)
        
        const newFormErrors = {};

        fields.forEach((field) => {
            const value = outValues[field.input.id];

            if (value === undefined || !field.validations) return;

            const errors = [];
            Object.entries(field.validations).forEach(([validationKey, validation]) => {
                const validate = validationStrategies[validationKey];

                if (validate && !validate(value, validation.value)) {
                    errors.push(validationKey);
                }
            })

            if (errors.length > 0) { newFormErrors[field.input.id] = errors; }
        })

        setFormErrors(newFormErrors);

        return Object.keys(newFormErrors).length === 0;
    }

    return { formErrors, inputRefs, isFormValid, initOutValues }
}

export default useForm;