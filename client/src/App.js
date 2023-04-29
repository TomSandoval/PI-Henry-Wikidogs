import './App.css';
import Home from "./components/Home/Home"
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail'
import {Route, Switch} from "react-router-dom"
import Form from './components/Form/Form';

function App() {

  


  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}/>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path='/create' component={Form}/>
        </Switch>
    </div>
  );
};



export default App;
