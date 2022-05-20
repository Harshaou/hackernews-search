/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import styles from './index.module.css';

const DetailComponent = () => {
  const { slug } = useParams();
  const [state, setState] = useState([]);

  const handleSearch = async (arg) => {
    let res = await axios.get(`http://hn.algolia.com/api/v1/items/${slug}`);
    setState(res.data);
  };

  useEffect(() => {
    if (slug) {
      handleSearch();
    }
  }, [slug]);

  console.log('heloooo', state);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{`Rick & Morty Characters`}</h1>
      {state && (
        <>
          <p>title: {state.title}</p>
          <p>Points: {state.title}</p>
          <div>
            {state?.children?.map((item, index) => (
              <div key={index}>
                <p>{item.author}</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailComponent;
