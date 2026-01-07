import React, { useState, useEffect } from 'react';

function App() {
  // 1. Initialize State: Check localStorage first, or use a default JSON object
  const [surveyData, setSurveyData] = useState(() => {
    const saved = localStorage.getItem('user_survey_response');
    return saved ? JSON.parse(saved) : {
      username: '',
      experience: '',
      features: [],
      rating: 5
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Persistent Storage: Save the JSON object to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user_survey_response', JSON.stringify(surveyData));
  }, [surveyData]);

  // 3. Handle Changes: Updates the specific JSON key dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Final JSON Data Saved:", JSON.stringify(surveyData, null, 2));
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Thank you, {surveyData.username}!</h2>
        <p>Your data has been stored locally as a JSON object.</p>
        <button onClick={() => setIsSubmitted(false)}>Edit Response</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>Interactive form</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Input */}
        <label>Name:</label>
        <input 
          type="text" 
          name="username" 
          value={surveyData.username} 
          onChange={handleChange} 
          style={inputStyle}
          required
        />

        {/* Interactive Logic: Show next question only if name exists */}
        {surveyData.username.length > 2 && (
          <div style={{ marginTop: '20px' }}>
            <label>Overall Experience:</label>
            <select name="experience" value={surveyData.experience} onChange={handleChange} style={inputStyle}>
              <option value="">Select...</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        )}

        {/* Branching Logic: If experience is 'Poor', ask for feedback */}
        {surveyData.experience === 'Poor' && (
          <div style={{ marginTop: '20px', color: 'red' }}>
            <label>We're sorry! How can we improve?</label>
            <textarea 
              name="feedback" 
              onChange={handleChange} 
              style={inputStyle}
            />
          </div>
        )}

        <button type="submit" style={buttonStyle}>Save Locally</button>
      </form>

      <div style={{ marginTop: '40px', background: '#f4f4f4', padding: '10px' }}>
        <h4>Live JSON Preview:</h4>
        <pre>{JSON.stringify(surveyData, null, 2)}</pre>
      </div>
    </div>
  );
}

// Simple Styles
const inputStyle = { display: 'block', width: '100%', marginBottom: '15px', padding: '10px' };
const buttonStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' };

export default App;