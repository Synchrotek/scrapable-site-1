import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export default function CaptchaPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState({});

  async function getCaptcha() {
    await axios.get(
      import.meta.env.VITE_BACKEND_ENDPOINT + '/api/captcha').then(respone => {
        setGeneratedCaptcha(respone.data.data);
        // setCaptchaImg(<h1>Hello there</h1>);s
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || captcha === '') {
      return toast.error('Please provide all fields');
    }
    if (captcha !== generatedCaptcha.text) {
      getCaptcha();
      return toast.error("Captcha Invalid.");
    }

    await axios.post(
      import.meta.env.VITE_BACKEND_ENDPOINT + '/api/generate_otp', { email })
      .then(respone => {
        toast.success(respone.data.message);
      });
    navigate('/validate', { state: { email } });
  }

  useEffect(() => {
    getCaptcha();
  }, []);

  return (
    <form className="flex flex-col justify-center gap-2 min-w-[80%]"
      onSubmit={onSubmit}
    >

      <h1 className="text-2xl border-b-2 text-center my-2">Welcome to InternA</h1>
      <label>Enter email :</label>
      <input type="email"
        className="text-black rounded bg-slate-200 focus-within:outline-none p-2 h-14"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {/* <button className='underline text-start'
        onClick={getCaptcha}
      >reload captcha</button> */}
      <p>Enter shown captcha :</p>
      <div className='flex justify-between pb-3 gap-5'>
        <input type="text"
          className="text-black rounded bg-slate-300 focus-within:outline-none p-2 w-2/3"
          value={captcha}
          onChange={e => setCaptcha(e.target.value)}
        />
        <div className='bg-white w-1/2 h-14'>
          <div dangerouslySetInnerHTML={{ __html: generatedCaptcha.data }} />
        </div>
      </div>
      <button type="submit"
        className="border rounded-lg p-1"
      >Get OTP</button>
    </form>
  )
}
