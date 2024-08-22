import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import axios from "axios";

const EditContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c._id === id)
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber || '');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact && token) {
      try {
        await axios.put(`http://localhost:5000/api/contacts/${id}`, {
          firstName,
          lastName,
          phoneNumber,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate('/contacts');
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
