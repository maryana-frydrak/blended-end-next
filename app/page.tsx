'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const isError = useCurrencyStore((state) => state.isError);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const info = useCurrencyStore((state) => state.exchangeInfo);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            title="What currencies do you want to exchange?🙂"
            top={false}
            bottom={false}
            error={false}
          />
          <ExchangeForm />
          {info && <ExchangeInfo {...info} />}
          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
              info={false}
              top={false}
              bottom={false}
            />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
}
