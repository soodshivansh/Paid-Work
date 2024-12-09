import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/profileService';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  // Dummy data for demonstration

  const [pets, setPets] = useState([]);
  const [mail, setmail] = useState("");

  const navigate = useNavigate();

  const loadUserData = async () => {
    try{
      const response = await getProfile();
      if (response.success && response.user) {
        const user = response.user;
        setmail(user.email || "");
      }
    }catch(err){
      console.log("Something went wrong");
    }
  }

  const handleApprove = async (id) => {
    try {      
      const response = await axios.post("http://localhost:8080/api/change-pet-status", {
        id: id,
        status: true, // Sending status as true for approval
      });
      console.log(response.data.msg); // Log success message
      window.location.reload();
    } catch (error) {
      console.error("Error approving pet:", error.response?.data?.msg || error.message);
    }
  };
  

  const handleDisapprove = async (id) => {
    try {
        const response = await axios.post("http://localhost:8080/api/change-pet-status", {
          id: id,
          status: false, // Sending status as false for approval
        });
        console.log(response.data.msg); // Log success message
      } catch (error) {
        console.error("Error disapproving pet:", error.response?.data?.msg || error.message);
      }
  };

  const fetchPetsData = async (setPets) => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets");
      // Filter pets by approvedStatus and sort by creation date
      const approvedPets = response.data
        .filter(pet => !pet.approvedStatus)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date
      setPets(approvedPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    // Immediately fetch pets when navigating from rehoming page
    // loadUserData();
    // console.log(mail);
    
    //   if(mail != "admin@gmail.com"){
    //       navigate('/');
    //   }
      fetchPetsData(setPets);
  },[]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'left', marginTop: '30px',  marginLeft: '30px', marginBottom: '30px', fontSize: '40px' }}>Admin Panel</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pets.map((pet) => (
          <div
            key={pet._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div>
              <strong>Pet Name:</strong> {pet.name}
            </div>
            <div>
              <strong>type:</strong> {pet.type}
            </div>
            <div>
              <strong>color:</strong> {pet.color}
            </div>
            <div>
              <strong>size:</strong> {pet.size}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleApprove(pet._id)}
                style={{
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleDisapprove(pet._id)}
                style={{
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Disapprove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;