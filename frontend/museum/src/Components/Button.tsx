import React from 'react';
import { Event } from '../types';

interface ButtonProps {
  eventData: Event;
}

class Button extends React.Component<ButtonProps> {
  postData = async () => {
    const { eventData } = this.props;
    try {
      const response = await fetch('http://localhost:8000/create_scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    return <button onClick={this.postData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Send Data
    </button>;
  }
}

export default Button;