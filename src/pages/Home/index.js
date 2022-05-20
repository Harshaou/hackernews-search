/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import Loader from '../../components/Loader';
import config from '../../config';
import Status from '../../components/Status';
import styles from './index.module.css';
import { Input } from 'antd';

const { Search } = Input;

const HomeComponent = () => {
  const [state, setState] = useState([]);
  const handleSearch = async (arg) => {
    console.log(arg);
    let res = await axios.get(`http://hn.algolia.com/api/v1/search?query=${arg}`);
    setState(res.data.hits);
    console.log(state);
  };

  console.log(state);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{`Hacker News Search`}</h2>
      <div className={styles.inputDiv}>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="input search text"
          size="large"
        />
      </div>
      <div>
        <div className={styles.articleDiv}>
          {state?.length > 0 &&
            state.map((item, index) => (
              <p key={index} className={styles.articleItem}>
                <Link to={item.objectID}>{item.title}</Link>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
