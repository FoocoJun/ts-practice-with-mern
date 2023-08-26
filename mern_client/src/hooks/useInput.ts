import React from 'react';

function useInput(initialForm: string) {
  const [value, setValue] = React.useState(initialForm);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValue(value);
    },
    []
  );

  return { value, setValue, onChange };
}

export default useInput;
