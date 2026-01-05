//instead of div we can use React fragment <> </> also to get rid of return statement we can use arrow function with () brackets

import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage/LandingPage';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/loginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);


  return (
    // creating our 1st router dom by importing react router
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        {/* <LandingPage /> */}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleNote />} />
          <Route path='/mynotes' element={<MyNotes search={search} />} />
        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
