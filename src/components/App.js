import React,{useState,useEffect} from 'react';
import {BrowserRouter as Routes,Route,Link} from "react-router-dom";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App(){
const LOCAL_STORAGE_KEY='contacts';
const [contacts,setContacts]=useState([]); 

const addContactHandler=(contact)=>{
  console.log(contact);
  setContacts([...contacts,{id:(Math.random()*100) % 500,...contact}]);
};

const removeContactHandler=(id)=>{
  const newContactList=contacts.filter((contact)=>{
    return contact.id!==id;
  })
  setContacts(newContactList);
};

useEffect(()=>{
  const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); //here we will be able to retrieve data even after we refresh
  if(retriveContacts) setContacts(retriveContacts);
},[]);

useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));   //here we are storing in local storage

},[contacts]);

return(
    <div className='ui container'>
      <Routes>
      <Header/>
      
      <Route path="/add" element={<AddContact/>}/>
      <Route path="/" element={<ContactList/>}/>
      
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>  */}
      </Routes>
    </div>
  )
}

export default App;