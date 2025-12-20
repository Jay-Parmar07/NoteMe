//instead of div we can use React fragment <> </> also to get rid of return statement we can use arrow function with () brackets

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


const App=() => 
   (
    <>
    <Header/>
    <Footer/>
    </>
  );


export default App;
