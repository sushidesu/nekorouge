import React from 'react';

interface ActivityLogProps {
  currentActivity?: string;
  discoveries: string[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ currentActivity, discoveries }) => {
  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#fff8dc',
      borderRadius: '10px',
      marginTop: '20px',
      minHeight: '100px',
      color: '#333',
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>📖 ねこのにっき</h3>
      
      {currentActivity && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffe4b5',
          borderRadius: '5px',
          marginBottom: '10px',
          fontSize: '16px',
          animation: 'fadeIn 0.5s',
          color: '#333',
        }}>
          {currentActivity}
        </div>
      )}
      
      {discoveries.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4 style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>みつけたもの:</h4>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '5px',
            maxHeight: '60px',
            overflowY: 'auto',
          }}>
            {discoveries.slice(-5).map((discovery, index) => (
              <span 
                key={index}
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#f0e68c',
                  borderRadius: '3px',
                  fontSize: '12px',
                  color: '#333',
                }}
              >
                {discovery.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};