import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export default function ValidatePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState(state.email || '');
  const [givenOtp, setGivenOtp] = useState('');

  async function checkOtp({ email, otp }) {
    await axios.post(
      import.meta.env.VITE_BACKEND_ENDPOINT + '/api/check_otp', { email, otp })
      .then(() => {
        toast.success("Congrats Your Email is verified.");
      }).catch(error => {
        toast.error(error.response.data.message);
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || givenOtp === '') {
      return toast.error('Please provide all fields');
    }
    await checkOtp({ email, otp: givenOtp });
    navigate('/welcome');
  }

  return (
    <form className="flex flex-col justify-center gap-1 min-w-[80%]"
      onSubmit={onSubmit}
    >

      <h1 className="text-xl border-b-2 text-center my-2">Validate your Mail</h1>
      <label>Your email :</label>
      <input type="email"
        className="text-black rounded bg-slate-200 focus-within:outline-none p-2 mb-10"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label>Enter OTP :</label>
      <input type="number"
        className="text-black rounded bg-slate-300 focus-within:outline-none p-2 mb-10"
        value={givenOtp}
        onChange={e => setGivenOtp(e.target.value)}
      />
      <button type="submit"
        className="border rounded-lg p-1"
      >Validate mail</button>
    </form>
  )
}
