import {useState, useEffect} from 'react';

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    useEffect(() => {
        console.log(`${Object.values(fields)}`)
    }, [fields])
  
    return [
      fields,
      function(event) {
        setValues({
          ...fields,
          [event.target.name]: event.target.value
        });
      }
    ];
}