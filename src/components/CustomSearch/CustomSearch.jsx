import './CustomSearch.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchHeadlines } from '../../lib/apiCalls';
import CardGroup from '../CardGroup/CardGroup';
import Loading from '../Loading/Loading';

const CustomSearch = ({ handleClick }) => {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHeadlines = async () => {
      setHeadlines(null);
      const results = await searchHeadlines(location.search);
      if (results instanceof Error) {
        console.log('ERROR IN SEARCH...');
        console.log(results.status, '-', results);
        navigate(`/error/${results.status}`);
      }
      setHeadlines(results);
      setLoading(false);
    };
    fetchHeadlines();
  }, [location, navigate]);

  return (
    <section id='search-results'>
      {loading && <Loading />}
      {headlines &&
        (headlines.length ? (
          <CardGroup
            category='search results'
            articles={headlines}
            handleClick={handleClick}
          />
        ) : (
          <>
            <h2>No Search Results.</h2>
            <p>Widen your search criteria & try again.</p>
          </>
        ))}
    </section>
  );
};

export default CustomSearch;
