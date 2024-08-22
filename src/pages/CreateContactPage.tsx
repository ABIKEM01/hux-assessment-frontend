import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactsSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from "axios";

const CreateContactPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      phoneNumber,
    };
    dispatch(addContact(newContact));
    navigate('/contacts');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ( token) {
      try {
        await axios.post(`http://localhost:5000/api/contacts`, {
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
        console.error("Error Creating contact:", error);
      }
    }
  };




  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Save Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContactPage;
