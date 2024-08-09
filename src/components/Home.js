import React from 'react'


import Notes from './Notes';


const Home = (props) => {
  const { showAlert } = props;
  return (  
    <div>

      <h2 className='my-3'>Welcome to iNoteboook !</h2>
      <Notes  showAlert={showAlert}/>
      
    </div>
  )
}

export default Home
