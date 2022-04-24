import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'redaxios'

type LocalGovernment = {
  code: string
  name: string
}

const getSuggestions = async (value: string): Promise<LocalGovernment[]> => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const res = await axios.get(
    '/local_governments.json', {
      params: {
        'q[name_cont]': value
      }
    }
  )
  const localGovernments = res.data

  return inputLength === 0 ? [] : localGovernments.filter(gov =>
    gov.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = (suggestion: LocalGovernment): string => suggestion.name;

const renderSuggestion = (suggestion: LocalGovernment) => (
  <div>
    {suggestion.name}
  </div>
);

const LocalGovernmentSuggest: React.FC = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<LocalGovernment[]>([])

  const onSuggestionsFetchRequested: Autosuggest.SuggestionsFetchRequested = async (request: Autosuggest.SuggestionsFetchRequestedParams) => {
    const suggestions = await getSuggestions(request.value)

    setSuggestions(suggestions)
  };

  const onSuggestionsClearRequested: Autosuggest.OnSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  const inputProps: Autosuggest.InputProps<LocalGovernment> = {
    placeholder: '都道府県 or 市区町村',
    value,
    onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

export default LocalGovernmentSuggest
