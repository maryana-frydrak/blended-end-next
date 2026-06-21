'use client';

import { Wave } from 'react-animated-text';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { useEffect } from 'react';
import { latestRates } from '@/lib/service/exchangeAPI';
import RatesList from '@/components/RatesList/RatesList';
import SelectRates from '@/components/SelectRates/SelectRates';
import Filter from '@/components/Filter/Filter';

export default function RatesPage() {
  const { rates, baseCurrency, setRates, hasHydrated, filter } = useCurrencyStore();

  useEffect(() => {
    if (hasHydrated) {
      latestRates(baseCurrency).then((data) => {
        const formattedData = data.map(([key, value]) => [key, Number(value)] as [string, number]);
        setRates(formattedData);
      });
    }
  }, [hasHydrated, baseCurrency, setRates]);

  if (!hasHydrated) return null;

  const filteredRates = rates
    .filter(([key]) => {
      const currencyName = key.toLowerCase();
      const filterValue = filter ? filter.toLowerCase() : '';

      return key !== baseCurrency && currencyName.includes(filterValue);
    })
    .map(([key, value]) => ({ key, value: (1 / Number(value)).toFixed(2) }));

  const isError = false;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {baseCurrency && <SelectRates baseCurrency={baseCurrency} />}

          <Filter />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}

          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        </Container>
      </Section>
    </main>
  );
}
