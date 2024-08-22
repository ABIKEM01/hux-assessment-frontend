import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../store/contactsSlice';
import { RootState, AppDispatch } from '../store/store'; 
import { Link } from 'react-router-dom';

const ContactsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const { contacts, status, error } = useSelector((state: RootState) => state.contacts);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchContacts(token));
    }
  }, [dispatch, token]);

  if (status === 'loading') {
    return <p>Loading contacts...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Contacts</h1>
      <Link to="/contacts/new" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Contact
      </Link>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} className="mb-4 p-4 md:w-1/4 border rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h2>
            <p>{contact.phoneNumber}</p>
            <div className="mt-2">
              <Link to={`/contacts/${contact._id}`} className="text-blue-500 mr-4">View</Link>
              <Link to={`/contacts/${contact._id}/edit`} className="text-yellow-500 mr-4">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsListPage;
