import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const ENDPOINT = "https://64948da90da866a95367f6c4.mockapi.io/addressbook";
  const [network, setNetwork] = useState([{}]);
  const [newPerson, setNewPerson] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [updatedPerson, setUpdatedPerson] = useState("");
  const [updatedBirthday, setUpdatedBirthday] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");


  useEffect(() => {
    getNetwork()
  }, [])

  function getNetwork() {
    fetch(ENDPOINT)
      .then((data) => data.json())
      .then((data) => {
        setNetwork(data)
        console.log(data)
      })
  }

  function deletePerson(id) {
    fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE"
    }).then(() => getNetwork())
  }

  function addNewPerson(e) {
    e.preventDefault();
    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newPerson,
        birthday: newBirthday,
        address: newAddress,
      })
    }).then(() => getNetwork())
    setNewPerson("")
    setNewBirthday("")
    setNewAddress("")
  }

  function updatePerson(e, personObject) {
    e.preventDefault();
    let updatedPersonObject = {
      ...personObject,
      name: updatedPerson,
      birthday: updatedBirthday,
      address: updatedAddress,
    }
    fetch(`${ENDPOINT}/${personObject.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPersonObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => getNetwork())
  }

  return (
    <div className="App">
      <header className="App-header">
        Welcome to the Network...
      </header>
      <div className='addForm'>
        <form onSubmit={addNewPerson}>
          <h4>Add a New Person to Your Network</h4>
          <div>
            <label>Name: </label>
            <input 
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Birthday: </label>
            <input 
              type='date'
              value={newBirthday}
              onChange={(e) => setNewBirthday(e.target.value)}
            ></input>
            <label>Address: </label>
            <input
              value={newAddress} 
              onChange={(e) => setNewAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <button type='submit'>Add!</button>
          </div>
        </form>
      </div>
      <div>
        {network.map((person, index) => (
          <div key={index}  className='Person-container'>
            <div>
              {person.name} <br />
              Birthday: {person.birthday} <br />
              Address: {person.address} <br />
              <button onClick={() => deletePerson(person.id)}>🗑 Delete</button>
            </div>
            <div>
              <form>
                <h4>Update Person</h4>
                <div>
                  <label>Name: </label>
                  <input 
                    onChange={(e) => setUpdatedPerson(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Birthday: </label>
                  <input 
                    type='date'
                    onChange={(e) => setUpdatedBirthday(e.target.value)}
                  ></input>
                  <label>Address: </label>
                  <input
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button onClick={(e) => updatePerson(e, person)}>Update!</button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
