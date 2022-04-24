// https://github.com/moroshko/react-autosuggest#basic-usage

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

type SuggestItem = {
  name: string
  year: number
}

// Imagine you have a list of languages that you'd like to autosuggest.
const languages: SuggestItem[] = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string): SuggestItem[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: SuggestItem): string => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: SuggestItem) => (
  <div>
    {suggestion.name}
  </div>
);

const AutosuggestExample: React.FC = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([])

  const onSuggestionsFetchRequested: Autosuggest.SuggestionsFetchRequested = (request: Autosuggest.SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(request.value))
  };

  const onSuggestionsClearRequested: Autosuggest.OnSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  const inputProps: Autosuggest.InputProps<SuggestItem> = {
    placeholder: 'Type a programming language',
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

export default AutosuggestExample
