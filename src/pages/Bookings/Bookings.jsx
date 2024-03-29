import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user, email } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const url = `https://car-doctor-server-delta-lilac.vercel.app/bookings?email=${user.email}`;
  useEffect(() => {
    fetch(url,{
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
    }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else{
          // logout and then navigate
          navigate('/');
        }
      })
  }, [url,navigate]);

  const handleDelete = id =>{
    const proceed = confirm('Are you sure you want to delete');
    if(proceed){
       fetch(`https://car-doctor-server-delta-lilac.vercel.app/bookings/${id}`,{
        method: 'DELETE'
       })
       .then(res => res.json())
       .then(data => {
        console.log(data)
        if(data.deletedCount >0){
          alert('deleted successfully!');
          const remainingBookings = bookings.filter(booking => booking._id !== id);
          setBookings(remainingBookings)
        }
       })
    }
  }

  const  handleBookingConfirm = id =>{
    fetch(`https://car-doctor-server-delta-lilac.vercel.app/bookings/${id}`,{
      method:'PATCH',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({status:'confirm'})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount>0){
        // update state
        const reamining = bookings.filter(booking => booking._id !== id);
        const updated = bookings.find(booking => booking._id === id);
        updated.status = 'confirm';
        const newBookings = [updated,...reamining];
        setBookings(newBookings);
      }

    })
  }

  return (
    <div>
      <h2>Hlw</h2>
      <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
           {
            bookings.map(booking => <BookingRow
            key={booking._id}
            booking={booking}
            handleDelete = {handleDelete}
            handleBookingConfirm = { handleBookingConfirm}
            ></BookingRow>)
           }
            
          </tbody>
          {/* foot */}
          
        </table>
      </div>
    </div>
  );
};

export default Bookings;
