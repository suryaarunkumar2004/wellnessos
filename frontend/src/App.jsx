import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Doctors from './pages/Doctors/Doctors';
import HealthTracker from './pages/HealthTracker/HealthTracker';
import Settings from './pages/Settings/Settings';
import Blog from './pages/Blog/Blog';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import NotificationCenter from './pages/Notifications/NotificationCenter';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import RxChecker from './pages/RxChecker/RxChecker';
import AITriage from './pages/AITriage/AITriage';
import DosageGuide from './pages/DosageGuide/DosageGuide';
import More from './pages/More/More';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/health-tracker" element={<HealthTracker />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/rx-checker" element={<RxChecker />} />
        <Route path="/ai-triage" element={<AITriage />} />
        <Route path="/dosage-guide" element={<DosageGuide />} />
        <Route path="/more" element={<More />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/placeholder" element={<PlaceholderPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
