'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
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
