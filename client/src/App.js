import { Route, useLocation } from 'react-router-dom';
import { Home, Landing, Detail, Form } from './views';
import NavBar from './components/NavBar/NavBar';



function App() {

  const location = useLocation();
  //console.log(location);

  return (
    <div className="App">
      
      {location.pathname !== '/' && <NavBar/> }

      <Route 
        exact path = '/' 
        render = {()=><Landing/>}
      />

      <Route 
      path = '/home' 
      render = {() =><Home/>} 
      />

      <Route
        exact path = '/create'
        render = {() => <Form/>}
      />

      <Route
        exact path = '/detail/:id'
        render = {() => <Detail/> }
      />

    </div>
  );
}

export default App;
