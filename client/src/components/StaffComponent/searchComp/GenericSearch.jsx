import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './GenericSearch.module.css';

const GenericSearch = ({ dir, dest, query,searchFun, place = 'Buscar...', className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const customClass = className ? className : style.search;

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      try {
        if (searchTerm) {
          dispatch(searchFun(searchTerm));
        } 
        navigate(`/${dir}/${searchTerm}?type=${query}`);
        setSearchTerm('');
      } catch (error) {
        alert('Algo anda mal');
        console.log('algo anda mal en la search');
      }
    } else {
      navigate(`/${dest}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

 
  return (
    <div className={customClass}>
      <input
        type="search"
        placeholder={place}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyPress}
        className={customClass}
      />
      <button onClick={handleSearch} className={customClass}>
        Buscar
      </button>
    </div>
  );
};

export default GenericSearch;
