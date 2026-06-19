'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setEchangeInfo);
  const setIsloading = useCurrencyStore((state) => state.setIsLoading);
  const setIsError = useCurrencyStore((state) => state.setIsError);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('currency') as string;
    const [amount, from, , to] = value.split(' ');
    try {
      setIsloading(true);
      setExchangeInfo(null);
      setIsError(null);
      const info = await exchangeCurrency({
        amount: Number(amount),
        from,
        to,
      });
      setExchangeInfo(info);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
