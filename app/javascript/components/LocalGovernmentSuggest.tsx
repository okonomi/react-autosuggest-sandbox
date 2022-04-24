import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'redaxios'
import { useDebouncedCallback } from 'use-debounce'

type LocalGovernment = {
  code: string
  name: string
}

const getSuggestions = async (value: string): Promise<LocalGovernment[]> => {
  const res = await axios.get<LocalGovernment[]>(
    '/local_governments.json', {
      params: {
        'q[name_cont]': value
      }
    }
  )
  return res.data
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

  const onSuggestionsFetchRequested = useDebouncedCallback<Autosuggest.SuggestionsFetchRequested>(
    async ({ value }) => {
      const suggestions = await getSuggestions(value)
      setSuggestions(suggestions)
    },
    500
  )

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

  // https://github.com/moroshko/react-autosuggest/issues/64#issuecomment-631794527
  const theme = {
    container: 'autosuggest',
    input: 'form-control',
    suggestionsContainer: 'dropdown',
    suggestionsList: `dropdown-menu w-100 ${suggestions.length ? 'show' : ''}`,
    suggestion: 'dropdown-item',
    suggestionHighlighted: 'active'
 };

return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
    />
  );
}

export default LocalGovernmentSuggest
