import React from "react";

class Button extends React.Component {
  postData = async () => {
    try {
      const response = await fetch('http://localhost:8000/create_scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: 'Moon Landing',
          date: '1969',
        } )
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    return (
      <button onClick={this.postData}>
        Send Data
      </button>
    );
  }
}

export default Button;