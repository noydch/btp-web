import React, { useState, useEffect } from 'react';
import './App.css';
import { RouterPaths } from './router/Router';
import { addViewApi } from './api/view';

function App() {
  const [view, setView] = useState([]);

  useEffect(() => {
    const lastViewTime = localStorage.getItem('lastViewTime');
    const currentTime = new Date().getTime();
    const sessionFlag = sessionStorage.getItem('hasViewed'); // Check if the view has been added in this session

    // If the view hasn't been added in this session, add it
    if (!sessionFlag) {
      // Check if an hour has passed since the last view or if it's a new session
      if (!lastViewTime || currentTime - lastViewTime > 3600000) {
        addView();
      }
    }
  }, []);

  async function addView() {
    try {
      const response = await addViewApi();
      setView(response.data); // Assuming the response has a data property
      localStorage.setItem('lastViewTime', new Date().getTime());
      sessionStorage.setItem('hasViewed', 'true'); // Set session flag to prevent duplicate views
    } catch (error) {
      console.error('Error adding view:', error);
    }
  }

  //console.log(view);

  return (
    <>
      <RouterPaths />
    </>
  );
}

export default App;
