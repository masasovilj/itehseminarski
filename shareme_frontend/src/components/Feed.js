import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// utils
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

// components
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
//vadjenje svih pinova
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message='We are adding new pictures to your feed!' />;

  if (!pins?.length)
    return (
      <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
        No pins available!
      </div>
    );

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
