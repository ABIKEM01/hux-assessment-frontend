import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteContact } from '../store/contactsSlice';
import axios from "axios";

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c._id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  // const handleDelete = () => {
  //   if (contact) {
  //     dispatch(deleteContact(contact._id));
  //     navigate('/contacts');
  //   }
  // };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact && token) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate('/contacts');
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };
  if (!contact) {
    return <p>Contact not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Details</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p><strong>First Name:</strong> {contact.firstName}</p>
        <p><strong>Last Name:</strong> {contact.lastName}</p>
        <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
        <div className="mt-4">
          <Link to={`/contacts/${contact._id}/edit`} className="text-yellow-500 mr-4">Edit</Link>
          <button onClick={handleDelete} className="text-red-500">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
