import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'

type LocalGovernment = {
  code: string
  name: string
}

const localGovernments: LocalGovernment[] = [
  { code: '011002', name: '北海道札幌市' },
  { code: '022012', name: '青森県青森市' }
]

const getSuggestions = (value: string): LocalGovernment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

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

  const onSuggestionsFetchRequested: Autosuggest.SuggestionsFetchRequested = (request: Autosuggest.SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(request.value))
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
