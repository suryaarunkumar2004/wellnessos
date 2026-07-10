import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Doctors from './pages/Doctors/Doctors';
import DoctorDetail from './pages/Doctors/DoctorDetail';
import HealthTracker from './pages/HealthTracker/HealthTracker';
import Services from './pages/Services/Services';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import DosageGuide from './pages/DosageGuide/DosageGuide';
import CompareDrugs from './pages/DosageGuide/CompareDrugs';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/Blog/BlogDetail';
import Cart from './pages/Cart/Cart';
import Favorites from './pages/Favorites/Favorites';
import MyBookmarks from './pages/MyBookmarks/MyBookmarks';
import Appointments from './pages/Appointments/Appointments';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import Telehealth from './pages/Telehealth/Telehealth';
import VideoConsultation from './pages/VideoConsultation/VideoConsultation';
import MedicalHistory from './pages/MedicalHistory/MedicalHistory';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Notifications from './pages/Notifications/NotificationCenter';
import Privacy from './pages/Privacy/Privacy';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import More from './pages/More/More';
import Billing from './pages/Billing/Billing';
import Reports from './pages/Reports/Reports';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import MyLikes from './pages/MyLikes/MyLikes';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';
import Community from './pages/Community/Community';
import Compare from './pages/Compare/Compare';
import Prescription from './pages/Prescription/Prescription';
import Workouts from './pages/Workouts/Workouts';
import Medications from './pages/Medications/Medications';
import SignUp from './pages/SignUp/SignUp';
import BookAppointmentPage from './pages/BookAppointment/BookAppointment';

// Health Tools imports - ALL 52 Tools
import {
  BmiCalculator,
  BmrCalculator,
  BodyFatCalculator,
  IdealWeightCalculator,
  CalorieCalculator,
  MacroCalculator,
  WaterIntakeCalculator,
  SleepCalculator,
  StressLevelChecker,
  FitnessAgeCalculator,
  StepTracker,
  HeartRateMonitor,
  BloodPressureLog,
  BloodSugarLog,
  WeightTracker,
  SleepQualityTracker,
  MoodTracker,
  SpO2Tracker,
  SymptomChecker,
  DrugInteractionChecker,
  DrugDosageCalculator,
  VaccineSchedulePlanner,
  HealthRiskAssessment,
  LabResultsInterpreter,
  NearestHospitalFinder,
  AllergyProfileManager,
  MealPlanner,
  FoodNutritionSearch,
  FoodDiary,
  HydrationPlanner,
  SupplementGuide,
  GlycaemicIndexLookup,
  ShareResults,
  SleepHygieneGuide,
  MentalHealthScreener,
  StressReliefExercises,
  GuidedMeditation,
  BreathingExercises,
  HIITTimer,
  RunningPaceCalculator,
  ExerciseDatabase,
  MedicalDictionary,
  CalorieBurnEstimator,
  FitnessLevelTest,
  HealthArticlesLibrary,
  HealthStatsDashboard,
  HealthChallenges,
  SymptomLibrary,
  FirstAidGuide,
  MoodJournal,
  WorkoutPlanner,
  Leaderboard
} from './pages/HealthTools/index';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { DrugProvider } from './contexts/DrugContext';
import { ToastProvider } from './contexts/ToastContext';
import { SymptomProvider } from './contexts/SymptomContext';
import { BookmarksProvider } from './contexts/BookmarksContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PrescriptionProvider } from './contexts/PrescriptionContext';
import { SettingsProvider } from './contexts/SettingsContext';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <DrugProvider>
              <SymptomProvider>
                <BookmarksProvider>
                  <FavoritesProvider>
                    <NotificationProvider>
                      <PrescriptionProvider>
                        <SettingsProvider>
                          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <Navbar />
                            <main style={{ flex: 1 }}>
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password" element={<ResetPassword />} />
                                <Route path="/verify-email" element={<EmailVerification />} />
                                <Route path="/otp-verify" element={<OtpVerification />} />
                                <Route path="/password-reset" element={<PasswordReset />} />
                                
                                {/* Protected Routes */}
                                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                                <Route path="/medical-history" element={<ProtectedRoute><MedicalHistory /></ProtectedRoute>} />
                                <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
                                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                                <Route path="/my-likes" element={<ProtectedRoute><MyLikes /></ProtectedRoute>} />
                                <Route path="/my-bookmarks" element={<ProtectedRoute><MyBookmarks /></ProtectedRoute>} />
                                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                                <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                                <Route path="/book-appointment" element={<ProtectedRoute><BookAppointmentPage /></ProtectedRoute>} />
                                <Route path="/prescription" element={<ProtectedRoute><Prescription /></ProtectedRoute>} />
                                
                                <Route path="/doctors" element={<Doctors />} />
                                <Route path="/doctors/:id" element={<DoctorDetail />} />
                                <Route path="/health-tracker" element={<HealthTracker />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/services/:id" element={<ServiceDetail />} />
                                <Route path="/dosage-guide" element={<DosageGuide />} />
                                <Route path="/compare-drugs" element={<CompareDrugs />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:id" element={<BlogDetail />} />
                                <Route path="/telehealth" element={<Telehealth />} />
                                <Route path="/video-consultation" element={<VideoConsultation />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/more" element={<More />} />
                                <Route path="/community" element={<Community />} />
                                <Route path="/compare" element={<Compare />} />
                                <Route path="/workouts" element={<Workouts />} />
                                <Route path="/medications" element={<Medications />} />
                                <Route path="/placeholder" element={<PlaceholderPage />} />
                                <Route path="/book-appointment-page" element={<BookAppointmentPage />} />

                                {/* HEALTH TOOLS ROUTES - ALL 52 */}
                                <Route path="/health-tools/bmi" element={<BmiCalculator />} />
                                <Route path="/health-tools/bmr" element={<BmrCalculator />} />
                                <Route path="/health-tools/body-fat" element={<BodyFatCalculator />} />
                                <Route path="/health-tools/ideal-weight" element={<IdealWeightCalculator />} />
                                <Route path="/health-tools/calorie" element={<CalorieCalculator />} />
                                <Route path="/health-tools/macro" element={<MacroCalculator />} />
                                <Route path="/health-tools/water" element={<WaterIntakeCalculator />} />
                                <Route path="/health-tools/sleep" element={<SleepCalculator />} />
                                <Route path="/health-tools/stress" element={<StressLevelChecker />} />
                                <Route path="/health-tools/fitness-age" element={<FitnessAgeCalculator />} />
                                <Route path="/health-tools/steps" element={<StepTracker />} />
                                <Route path="/health-tools/heart-rate" element={<HeartRateMonitor />} />
                                <Route path="/health-tools/blood-pressure" element={<BloodPressureLog />} />
                                <Route path="/health-tools/blood-sugar" element={<BloodSugarLog />} />
                                <Route path="/health-tools/weight" element={<WeightTracker />} />
                                <Route path="/health-tools/sleep-quality" element={<SleepQualityTracker />} />
                                <Route path="/health-tools/mood" element={<MoodTracker />} />
                                <Route path="/health-tools/spo2" element={<SpO2Tracker />} />
                                <Route path="/health-tools/symptom-checker" element={<SymptomChecker />} />
                                <Route path="/health-tools/drug-interaction" element={<DrugInteractionChecker />} />
                                <Route path="/health-tools/drug-dosage" element={<DrugDosageCalculator />} />
                                <Route path="/health-tools/vaccine-schedule" element={<VaccineSchedulePlanner />} />
                                <Route path="/health-tools/health-risk" element={<HealthRiskAssessment />} />
                                <Route path="/health-tools/lab-results" element={<LabResultsInterpreter />} />
                                <Route path="/health-tools/hospital-finder" element={<NearestHospitalFinder />} />
                                <Route path="/health-tools/allergy-profile" element={<AllergyProfileManager />} />
                                <Route path="/health-tools/meal-planner" element={<MealPlanner />} />
                                <Route path="/health-tools/food-nutrition" element={<FoodNutritionSearch />} />
                                <Route path="/health-tools/food-diary" element={<FoodDiary />} />
                                <Route path="/health-tools/hydration-planner" element={<HydrationPlanner />} />
                                <Route path="/health-tools/supplement-guide" element={<SupplementGuide />} />
                                <Route path="/health-tools/gi-lookup" element={<GlycaemicIndexLookup />} />
                                <Route path="/health-tools/share-results" element={<ShareResults />} />
                                <Route path="/health-tools/sleep-hygiene" element={<SleepHygieneGuide />} />
                                <Route path="/health-tools/mental-health" element={<MentalHealthScreener />} />
                                <Route path="/health-tools/stress-relief" element={<StressReliefExercises />} />
                                <Route path="/health-tools/meditation" element={<GuidedMeditation />} />
                                <Route path="/health-tools/breathing" element={<BreathingExercises />} />
                                <Route path="/health-tools/hiit" element={<HIITTimer />} />
                                <Route path="/health-tools/running-pace" element={<RunningPaceCalculator />} />
                                <Route path="/health-tools/exercise-database" element={<ExerciseDatabase />} />
                                <Route path="/health-tools/medical-dictionary" element={<MedicalDictionary />} />
                                <Route path="/health-tools/calorie-burn" element={<CalorieBurnEstimator />} />
                                <Route path="/health-tools/fitness-level" element={<FitnessLevelTest />} />
                                <Route path="/health-tools/articles" element={<HealthArticlesLibrary />} />
                                <Route path="/health-tools/stats-dashboard" element={<HealthStatsDashboard />} />
                                <Route path="/health-tools/challenges" element={<HealthChallenges />} />
                                <Route path="/health-tools/symptom-library" element={<SymptomLibrary />} />
                                <Route path="/health-tools/first-aid" element={<FirstAidGuide />} />
                                <Route path="/health-tools/mood-journal" element={<MoodJournal />} />
                                <Route path="/health-tools/workout-planner" element={<WorkoutPlanner />} />
                                <Route path="/health-tools/leaderboard" element={<Leaderboard />} />

                                {/* Catch all */}
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </main>
                            <Footer />
                          </div>
                        </SettingsProvider>
                      </PrescriptionProvider>
                    </NotificationProvider>
                  </FavoritesProvider>
                </BookmarksProvider>
              </SymptomProvider>
            </DrugProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
