import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [approvals, setApprovals] = useState({});
  const [lastApprovals, setLastApprovals] = useState({});
  const [remarks, setRemarks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const BASE_URL = ["http://localhost:8000", "https://azureexcelbewebapp.azurewebsites.net"][1];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/load/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const fileContents = await response.json();
        setData(fileContents);
        const defaultApprovals = {};
        const defaultLastApprovals = {};
        const defaultRemarks = {};

        fileContents.forEach(item => {
          defaultApprovals[item.ID] = item.Approval;
          defaultLastApprovals[item.ID] = item.LastApproval;
          defaultRemarks[item.ID] = item.Remark;
        });
        setApprovals(defaultApprovals);
        setLastApprovals(defaultLastApprovals);
        setRemarks(defaultRemarks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch('/.auth/me');
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const payload = await response.json();
        const name = (payload[0] && payload[0].user_id) ? payload[0].user_id : "anonymous";
        setUserInfo(name);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUserInfo("anonymous");
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userInfoShort = `${userInfo.split(".")[0].charAt(0).toUpperCase() + userInfo.split(".")[0].slice(1)}`;

  const handleApprovalChange = (id, approval) => {
    setApprovals(prevApprovals => ({
      ...prevApprovals,
      [id]: approval,
    }));
  };

  const handleRemarksChange = (id, remark) => {
    setRemarks(prevRemarks => ({
      ...prevRemarks,
      [id]: remark,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { approvals, remarks, userInfo } }),
      });
      const responseData = await response.json();
      console.log('Data submitted successfully:', responseData);
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen relative">
      <div className="header-banner h-10 bg-white w-full flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#1f1547', width: '100%' }}>
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 mr-4" />
        </div>
        <div className="flex items-center">
          <img src="/user.png" alt="User Icon" className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-semibold text-gray-100">{width < 768 ? `Welcome, ${userInfoShort}` : `${userInfo}`}</h3>
        </div>
      </div>
      <div className="header-banner h-60 bg-cover bg-center" style={{ backgroundImage: `url('/banner.jpg')` }}></div>
      <h1 className="text-2xl font-bold mb-0 mt-0 text-center text-white" style={{ backgroundColor: '#1f1547', padding: '1rem 0', width: '100%' }}>Cenitex Cloud Hosting</h1>
      <h3 className="text-sm mb-0 mt-0 text-center text-white" style={{ backgroundColor: '#510778', padding: '1rem 0', width: '100%' }}>Effortlessly manage privileged user access, embodying our commitment to security-focused tech solutions</h3>
      <div className="p-6 flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map(item => (
              <div key={item.ID} className="bg-white rounded-lg p-4 hover:shadow-xl transition duration-300 ease-in-out border border-gray-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <label className="text-sm text-gray-800 font-semibold">Approval</label>
                    {approvals[item.ID] === 'Y' && <div className="green-icon"></div>}
                    {approvals[item.ID] === 'N' && <div className="red-icon"></div>}
                    {approvals[item.ID] !== 'Y' && approvals[item.ID] !== 'N' && <div className="yellow-icon"></div>}
                    {lastApprovals[item.ID] === 'Y' && <div className="green-icon"></div>}
                    {lastApprovals[item.ID] === 'N' && <div className="red-icon"></div>}
                    {lastApprovals[item.ID] !== 'Y' && lastApprovals[item.ID] !== 'N' && <div className="black-icon"></div>}
                  </div>
                  <div className="relative" style={{ top: '-15px' }}>
                    <select
                      value={approvals[item.ID] || ''}
                      onChange={e => handleApprovalChange(item.ID, e.target.value)}
                      className="approval-dropdown absolute top-0 right-0"
                    >
                      <option value="">Select</option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-800 font-semibold">
                    {item.Firstname || item.Lastname ? `${item.Firstname} ${item.Lastname}` : item.Username}
                  </div>
                  <div className="text-gray-600" style={{ fontSize: '0.63rem' }}>{`${item.Sheetname}`}</div>
                  <div className="text-gray-600" style={{ fontSize: '0.63rem' }}>{`${item.Group}\\${item.Username}`}</div>
                </div>
                <div className="mt-2">
                  <hr className="mb-4 border-gray-300" />
                  <input
                    type="text"
                    value={remarks[item.ID] || ''}
                    onChange={e => handleRemarksChange(item.ID, e.target.value)}
                    className="bg-gray-100 text-gray-800 text-sm border border-gray-300 rounded-md px-3 py-2 w-full resize-none"
                    placeholder="Enter your remarks here"
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button mt-4">
            Submit
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="spinner"></div>
        </div>
      )}
      <br /><br /><br />
      <footer style={{ backgroundColor: '#1f1547' }} className="text-white py-4 text-center absolute bottom-0 w-full text-sm">
        John Lee © 2024 Cenitex. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
