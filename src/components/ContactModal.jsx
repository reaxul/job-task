import React, { useState, useEffect } from 'react';

const ContactModal = ({
  type,
  contacts,
  loading,
  onlyEven,
  searchTerm,
  onClose,
  onFilterChange,
  onScroll,
}) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  const handleOnlyEvenChange = (event) => {
    onFilterChange('onlyEven', event.target.checked);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    onFilterChange('search', value);
  };

  return (
    <div className="contact-modal">
      <div className="contact-modal-header">
        <h2>{type === 'all' ? 'All Contacts' : 'US Contacts'}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="contact-modal-filters">
        <label>
          Only Even Contacts
          <input
            type="checkbox"
            checked={onlyEven}
            onChange={handleOnlyEvenChange}
          />
        </label>
        <input
          type="text"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => handleContactClick(contact)}
          >
            {contact.name}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <button onClick={onScroll}>Load More</button>
      {selectedContact && (
        <div className="contact-details-modal">
          <h3>Contact Details</h3>
          <p>Name: {selectedContact.name}</p>
          <p>Email: {selectedContact.email}</p>
          <p>Phone: {selectedContact.phone}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ContactModal;
