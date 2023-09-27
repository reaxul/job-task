import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactModal from './ContactModal';

const Problem2 = () => {
  const [modalType, setModalType] = useState('all');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [modalType, pageNumber, onlyEven, searchTerm]);

  const fetchContacts = async () => {
    try {
      setLoading(true);

      let apiUrl = '';

      if (modalType === 'all') {
        apiUrl = `https://contact.mediusware.com/api/contacts?page=${pageNumber}`;
      } else if (modalType === 'us') {
        apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20states?page=${pageNumber}`;
      }

      const response = await axios.get(
        `${apiUrl}&onlyEven=${onlyEven}&search=${searchTerm}`
      );

      if (pageNumber === 1) {
        setContacts(response.data);
        setFilteredContacts(response.data);
      } else {
        setContacts([...contacts, ...response.data]);
        setFilteredContacts([...filteredContacts, ...response.data]);
      }

      setLoading(false);
    } catch (error) {
      console.error('API request error:', error);
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setPageNumber(1); 
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'onlyEven') {
      setOnlyEven(value);
    } else if (filterType === 'search') {
      setSearchTerm(value);
    }
  };

  const handleScroll = () => {
    if (!loading) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div>
      <button onClick={() => openModal('all')}>All Contacts</button>
      <button onClick={() => openModal('us')}>US Contacts</button>

      {modalType && (
        <ContactModal
          type={modalType}
          contacts={filteredContacts}
          loading={loading}
          onlyEven={onlyEven}
          searchTerm={searchTerm}
          onClose={closeModal}
          onFilterChange={handleFilterChange}
          onScroll={handleScroll}
        />
      )}
    </div>
  );
};

export default Problem2;
