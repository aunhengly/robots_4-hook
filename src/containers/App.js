import React, {useState, useEffect } from 'react';
import './App.css'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

function App() {
   const [robots, setRoots] = useState([]);
   const [searchfield, setSearchfield] = useState('');

   useEffect(()=> {
      fetch('https://jsonplaceholder.cypress.io/users')
            .then(response => response.json())
            .then(users => setRoots(users))
   },[])

   const onSearchChange = (event) => {
      setSearchfield(event.target.value)
   }
   
   const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
   });
      
   return !robots.length ?
      <h1>Loading</h1> :
      (
         <div className="tc">
            <h1 className="f1">Robot Friend</h1>
            <SearchBox searchChange={onSearchChange}/>
               <Scroll>
                  <ErrorBoundry>
                  <CardList robots= {filteredRobots}/>
                  </ErrorBoundry>
               </Scroll>
         </div>
      )
}

export default App;