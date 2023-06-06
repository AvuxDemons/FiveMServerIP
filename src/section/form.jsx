import { useState } from 'react';
import axios from 'axios';

function Form() {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { url } = e.target.elements;

    let request = `/api/join/${url.value.replace('https://', '').replace('cfx.re/join/', '')}`;

    try {
      const axiosResponse = await axios.get(request);
      const xCitizenfxUrl = axiosResponse.headers['x-citizenfx-url'].replace('https://', '').replace('http://', '').replaceAll('/', '');
      setResponse(xCitizenfxUrl);
      setStatus(true);
      setShowForm(false);
    } catch (error) {
      setResponse('Invalid or server might be offline!');
      setStatus(false);
      console.log(error);
    }
  };

  const handleBackClick = () => {
    setShowForm(true);
    setResponse('');
    setStatus(false);
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
        <form onSubmit={handleFormSubmit}>
          <div className="max-w-2xl text-center">
            <img
              className="mx-auto md:w-7/12"
              src="https://forum.cfx.re/uploads/default/original/4X/f/7/b/f7bd789d9d3ad55ff91dc57979e485e99e1a5273.png"
              alt="CFX.re Logo"
            />
            <p className="mt-3 lg:text-lg text-white">CFX.re FiveM Server Information</p>

            {showForm && (
              <div className="mt-5 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                <input
                  id="url"
                  name="url"
                  type="text"
                  className="rounded-md border border-transparent bg-gray-200/40 px-4 py-2 text-white placeholder-black/50 text-center backdrop-blur-sm focus:border-gray-400 focus:outline-none focus:ring focus:ring-zinc-900 focus:ring-opacity-40 sm:mx-2"
                  placeholder="'cfx.re/join/xxx' or 'xxx'"
                />

                <button className="transform rounded-md bg-zinc-900 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-zinc-600 focus:bg-zinc-600 focus:outline-none sm:mx-2">
                  SUBMIT
                </button>
              </div>
            )}
            {!showForm && (
              <div className="max-w-2xl text-center">
                <p className='px-8 my-2 py-2 text-white bg-zinc-900 rounded-md font-medium hover:bg-zinc-600 transition-colors duration-200'>{response}</p>

                <button className='px-8 my-2 py-2 text-white bg-zinc-900 rounded-md font-medium hover:bg-zinc-600 transition-colors duration-200' onClick={handleBackClick}>Back</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
