import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AddMenu from './components/AddMenu';
import OTP from './components/OTP';
import Card from './components/Card';
import Navbar2 from './components/Navbar2';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'
            exact element={
              <>
                <Navbar/>
               <Home category="all"/>
              </>
            } />
          <Route path='/login'
            exact element={
              <>
                <Navbar/>
               <Login/>
              </>
            } />
            <Route path='/otp'
            exact element={
              <>
                <Navbar/>
               <OTP/>
              </>
            } />
          <Route path='/signup'
            exact element={
              <>
                <Navbar/>
               <Signup/>
              </>
            } />
          <Route path='/add'
            exact element={
              <>
                <Navbar/>
               <AddMenu/>
              </>
            } />
          <Route path='/category'
            exact element={
              <>
                <Navbar/>
                <Navbar2/>
                <Card  />
              </>
            } />
          {/* <Route path='/italian'
            exact element={
              <>
                <Navbar/>
                <Card category="Italian"/>
              </>
            } />
          <Route path='/chinese'
            exact element={
              <>
                <Navbar/>
                <Card category="Chinese"/>
              </>
            } />
          <Route path='/dessert'
            exact element={
              <>
                <Navbar/>
               <Card category="Dessert"/>
              </>
            } /> */}
        </Routes>
      </Router>
    </>

  );
}

export default App;
