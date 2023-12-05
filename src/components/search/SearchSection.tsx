import React, { useEffect, useState } from 'react';

export const SearchSection: React.FC = () => {
  // State for managing rolling items
  const [rollingItems, setRollingItems] = useState<string[]>([]);

  useEffect(() => {
    // Add your logic for fetching rolling items here
    // For demonstration, I'm just setting some dummy data
    setRollingItems(['Item 1', 'Item 2', 'Item 3']);

    const height = 30; // Adjust height according to your CSS
    let move = 0;
    const interval = setInterval(() => {
      move += height;
      // Logic for rolling animation
      if (move >= height * rollingItems.length) {
        move = 0;
      }
      // Update DOM or state as needed for the animation
    }, 5000);

    return () => clearInterval(interval);
  }, [rollingItems]);

  return (
    <div className="border-gray-5px my-4">
      {/* ... Other content ... */}

      {/* Rolling Items Section */}
      <div className="col-6 px-3">
        <div className="row">
          {rollingItems.map((item, index) => (
            <div key={index} className="col-4">
              <div className="box_main btn-round">
                <div>{item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
