import React, { useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';



function App() {
  const ctx = useContext(AuthContext)

  // This Logic has been moved to the auth component
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', '1')
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn')
  //   setIsLoggedIn(false);
  // };

  return (
    // if we use a default value in the context we dont have to add a provider 
    // but in such cases we need the values inside the context to be changable
    // in this case we have to add a value prop to pass it to child components

    // Every component listening to auth component will have an access to these props
    <React.Fragment>
      <MainHeader />
      <main>
        {/* we dont use useContext here because we are directly using the login and logout handlers
        in the login and the home pages */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      </React.Fragment>
  );
}

export default App;
