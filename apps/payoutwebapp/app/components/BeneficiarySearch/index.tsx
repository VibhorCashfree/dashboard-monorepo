import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Text,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _debounce from 'lodash/debounce';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import Analytics from 'utils/analytics';

// Services
import { getSuggestions } from 'services/beneficiaries';

// Types
import type { Props, Suggestion, SuggestionsState, QueryState } from './types';

const BeneficiarySearch = ({ name, value, error, onChange }: Props) => {
  const [query, setQuery] = useState<QueryState>('');
  const [suggestions, setSuggestions] = useState<SuggestionsState>([]);
  const [loading, setLoading] = useState(false);

  const searchFn = useRef(
    _debounce(async (query) => {
      setSuggestions([]);

      const response: unknown = await getSuggestions(query);

      setLoading(false);

      setSuggestions(response as SuggestionsState);
    }, 1000),
  );

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchFn.current(query);
    } else {
      searchFn.current.cancel();

      setLoading(false);
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSuggestion = (suggestion: Suggestion) => (e: any) => {
    const value = suggestion.beneId;

    onChange(e, { name, value });

    Analytics.track('Dropdown_suggestion_beneId', {
      value,
    });
  };

  const beneficiaryName = _find(suggestions, { beneId: value });
  const noSuggestions = suggestions.length === 0 && value && !loading;

  return (
    <div className="mb-2">
      <Dropdown
        icon={null}
        fluid
        trigger={
          <Form.Input
            className="mb-0"
            name={name}
            label="Beneficiary ID"
            placeholder="Enter Beneficiary ID"
            autofill="off"
            autoComplete="off"
            error={error}
            value={query}
            loading={loading}
            onChange={(
              e: React.ChangeEvent,
              { value }: { value: string | undefined },
            ) => setQuery(value)}
          />
        }
      >
        <DropdownMenu>
          {suggestions.map((suggestion) => (
            <DropdownItem
              key={suggestion.beneId}
              text={suggestion.beneId}
              description={suggestion.name}
              onClick={handleSuggestion(suggestion)}
            />
          ))}

          {noSuggestions && (
            <Text color="bodyLight" className="m-2">
              No beneficiary found
            </Text>
          )}
        </DropdownMenu>
      </Dropdown>
      {beneficiaryName && (
        <Text variant="b12" color="bodyLight" className="mt-1">
          Beneficiary Name :{' '}
          <Text as="span" variant="b12">
            {beneficiaryName.name}
          </Text>
        </Text>
      )}
    </div>
  );
};

export default withErrorBoundary(BeneficiarySearch);
