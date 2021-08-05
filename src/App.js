import logo from './logo.svg';
import './App.css';
import MyBooks from './Mybooks'
import {Switch , Route } from 'react-router-dom'
import Admin from './admin/Admin'
import NavBar  from './layout/NavBar'


function App() {

  return (
    <div className="App">
     
      <NavBar />
      <main>
          <Switch>
             <Route exact path='/' component={MyBooks} /> 
             <Route exact path='/admin' component={Admin} /> 
          </Switch>
      </main>
     
     
    </div>
  );
}

export default App;
