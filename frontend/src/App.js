import './App.css';
import Header from './component/header/header';
import LandingPage from './screens/landingPage/landingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/login/loginScreen';
import RegisterScreen from './screens/register/registerScreen';
import UserHome from './screens/userHome/userHome';
import Status from './screens/appStatus.js/status';
import AdminHome from './adminComponents/adminHome';
import ViewApp from './adminComponents/viewApp';
import ManageRequest from './adminComponents/manageRequests';
import Slots from './adminComponents/slots';
import UserAppView from './screens/appStatus.js/userAppView';
import UserManagement from './adminComponents/UserManagement'
import EditUser from './adminComponents/EditUser'
import AddUser from './adminComponents/AddUser'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<UserHome />} />
            <Route path="/status" element={<Status />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/viewApplication" element={<ViewApp />} />
            <Route path="/manageRequest" element={<ManageRequest />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/userAppView" element={<UserAppView />} />
            <Route path="/usermanagement" element={< UserManagement />} />
            {/* <Route path="/editUser/:id" element={< EditUser />} /> */}
            <Route path="/editUser" element={< EditUser />} />
            <Route path="/adduser" element={<AddUser/>} />

          </Routes>

        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
