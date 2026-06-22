'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

interface PostPreviewClientProps {
  id: string;
}

export default function PostPreviewClient({ id }: PostPreviewClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  const handleClickBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    if (!data) return;
    const fn = async () => {
      const res = await fetchUserById(data.userId);
      setUser(res);
    };
    fn();
  }, [data]);

  if (isLoading) return <>Loading, please wait...</>;

  if (isError) {
    return <>Something went wrong</>;
  }

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClickBack} className={css.backBtn}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>

          <p className={css.content}>{data?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
