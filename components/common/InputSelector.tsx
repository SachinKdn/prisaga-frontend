import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import useDebounce from '@hooks/useDebounce';

// Generic type for option items
export interface AutocompleteOption {
  id: string | number;
  label: string;
  // disable-no-any
  [key: string]: any; // Allow for additional properties
}

interface DynamicAutocompleteProps {
  label: string;
  placeholder?: string;
  value: AutocompleteOption | null;
  onChange: (value: AutocompleteOption | null) => void;
  loadOptions: (inputValue: string) => Promise<AutocompleteOption[]>;
  initialOptions?: AutocompleteOption[];
  isRequired?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  debounceMs?: number;
  freeSolo?: boolean;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: AutocompleteOption
  ) => React.ReactNode;
}

const DynamicAutocomplete: React.FC<DynamicAutocompleteProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  loadOptions,
  initialOptions = [],
  isRequired = false,
  disabled = false,
  error = false,
  helperText = '',
  // debounceMs = 300,
  freeSolo = false,
  renderOption,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<AutocompleteOption[]>(initialOptions);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // Debounced function to load options
  const debouncedLoadOptions = useCallback(
    async (input: string) => {
      setLoading(true);
      try {
        const newOptions = await loadOptions(input);
        setOptions(newOptions);
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setLoading(false);
      }
    },
    [inputValue] // Dependencies are empty because we want to create this function once
  );
  // Load initial options when component mounts or open state changes
  console.log(debouncedLoadOptions);

  const debouncedInputValue = useDebounce(inputValue, 500);
  useEffect(() => {
    console.log('searchValue', debouncedInputValue);
    // Do whatever you need with the debounced value here
  }, [debouncedInputValue]);
  // Handle input change
  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    // Just update the input value directly - the debounce happens automatically
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) =>
        onChange(newValue as AutocompleteOption | null)
      }
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => {
        // Handle both string and AutocompleteOption
        if (typeof option === 'string') {
          return option;
        }
        return option.label || '';
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={isRequired}
          disabled={disabled}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      disabled={disabled}
      freeSolo={freeSolo}
      renderOption={renderOption}
    />
  );
};

export default DynamicAutocomplete;
