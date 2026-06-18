'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';

export default function Home() {
  const isError = false;

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
          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
              info={false}
              top={false}
              bottom={false}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
