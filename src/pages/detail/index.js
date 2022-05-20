/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
import { BiUpvote, BiLeftArrowCircle } from 'react-icons/bi';

const DetailComponent = () => {
  const navigate = useNavigate();
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

  return (
    <div className={styles.container}>
      {state && (
        <>
          <div className={styles.headerNav}>
            <BiLeftArrowCircle onClick={() => navigate('/')} className={styles.icon} />
            <div className={styles.headerContent}>
              <h2 className={styles.title}>{state.title}</h2>
              <div className={styles.point}>
                <BiUpvote size={20} />
                <span>{state.points}</span>
              </div>
            </div>
          </div>

          <div className="commentBox">
            <p>-- Comments {state?.children?.length}</p>
          </div>
          <div>
            {state?.children?.map((item, index) => (
              <div
                className={styles.comment}
                key={index}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailComponent;
