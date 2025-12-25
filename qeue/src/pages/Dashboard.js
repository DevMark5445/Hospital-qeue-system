// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { 
//   Activity, Calendar, Heart, Pill, FileText, Menu, X, Bell, 
//   Sun, Moon, LogOut, Home, Clock, AlertCircle, ChevronRight
// } from 'lucide-react';

// // Dashboard Context
// const DashboardContext = createContext();

// const useDashboard = () => {
//   const context = useContext(DashboardContext);
//   if (!context) throw new Error('useDashboard must be used within DashboardProvider');
//   return context;
// };

// // Custom hook for API calls
// const useApi = (endpoint, dependencies = []) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 800));
//         const mockData = generateMockData(endpoint);
//         setData(mockData);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, dependencies);

//   return { data, loading, error };
// };

// // Mock data generator
// const generateMockData = (endpoint) => {
//   if (endpoint === '/patient/vitals') {
//     return {
//       bloodPressure: { systolic: 120, diastolic: 80, status: 'normal', lastUpdated: '2 hours ago' },
//       heartRate: { value: 72, status: 'normal', lastUpdated: '2 hours ago' },
//       temperature: { value: 98.6, unit: '°F', status: 'normal', lastUpdated: '2 hours ago' },
//       weight: { value: 165, unit: 'lbs', change: -2, lastUpdated: '1 week ago' }
//     };
//   }
//   if (endpoint === '/patient/appointments') {
//     return [
//       { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-12-28', time: '10:00 AM', type: 'In-Person', status: 'confirmed' },
//       { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Practice', date: '2026-01-05', time: '2:30 PM', type: 'Video Call', status: 'confirmed' },
//       { id: 3, doctor: 'Dr. Emily Rodriguez', specialty: 'Dermatology', date: '2026-01-12', time: '11:00 AM', type: 'In-Person', status: 'pending' }
//     ];
//   }
//   if (endpoint === '/patient/medications') {
//     return [
//       { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', timeOfDay: 'Morning', prescribed: 'Dr. Sarah Johnson', refillsLeft: 2 },
//       { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', timeOfDay: 'Morning & Evening', prescribed: 'Dr. Michael Chen', refillsLeft: 1 },
//       { id: 3, name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily', timeOfDay: 'Morning', prescribed: 'Dr. Michael Chen', refillsLeft: 3 }
//     ];
//   }
//   if (endpoint === '/patient/activity') {
//     return [
//       { id: 1, action: 'Lab results available', description: 'Complete Blood Count results ready', time: '2 hours ago', type: 'lab' },
//       { id: 2, action: 'Appointment confirmed', description: 'Visit with Dr. Sarah Johnson', time: '1 day ago', type: 'appointment' },
//       { id: 3, action: 'Prescription refilled', description: 'Lisinopril 10mg refilled', time: '3 days ago', type: 'medication' },
//       { id: 4, action: 'Message from provider', description: 'Dr. Chen sent you a message', time: '5 days ago', type: 'message' }
//     ];
//   }
//   return [];
// };

// // Loading Component
// const LoadingState = () => {
//   const { darkMode } = useDashboard();
//   return (
//     <div className="flex items-center justify-center h-64">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//         <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading your health data...</p>
//       </div>
//     </div>
//   );
// };

// // Vital Signs Card
// const VitalCard = ({ title, value, unit, status, icon: Icon, subtitle }) => {
//   const { darkMode } = useDashboard();
  
//   const getStatusColor = () => {
//     if (status === 'normal') return 'text-green-600 bg-green-100';
//     if (status === 'warning') return 'text-yellow-600 bg-yellow-100';
//     return 'text-red-600 bg-red-100';
//   };
  
//   return (
//     <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6 transition-all hover:shadow-md`}>
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-lg ${getStatusColor()}`}>
//           <Icon className="w-6 h-6" />
//         </div>
//         <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
//           {status}
//         </span>
//       </div>
//       <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
//         {title}
//       </h3>
//       <div className="flex items-baseline gap-1">
//         <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           {value}
//         </p>
//         {unit && <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{unit}</span>}
//       </div>
//       {subtitle && (
//         <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// };

// // Appointments List
// const AppointmentsList = ({ appointments }) => {
//   const { darkMode } = useDashboard();
  
//   const getStatusBadge = (status) => {
//     if (status === 'confirmed') return 'bg-green-100 text-green-700';
//     if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
//     return 'bg-gray-100 text-gray-700';
//   };
  
//   return (
//     <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           Upcoming Appointments
//         </h3>
//         <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
//           View All <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="space-y-4">
//         {appointments?.map((apt) => (
//           <div key={apt.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-start justify-between mb-2">
//               <div>
//                 <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {apt.doctor}
//                 </h4>
//                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {apt.specialty}
//                 </p>
//               </div>
//               <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(apt.status)}`}>
//                 {apt.status}
//               </span>
//             </div>
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 {apt.date}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {apt.time}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//         Schedule New Appointment
//       </button>
//     </div>
//   );
// };

// // Medications List
// const MedicationsList = ({ medications }) => {
//   const { darkMode } = useDashboard();
  
//   return (
//     <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           Current Medications
//         </h3>
//         <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
//           View All <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="space-y-4">
//         {medications?.map((med) => (
//           <div key={med.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-start justify-between mb-2">
//               <div className="flex-1">
//                 <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {med.name}
//                 </h4>
//                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {med.dosage} - {med.frequency}
//                 </p>
//               </div>
//               <div className={`px-3 py-1 rounded-full text-xs ${
//                 med.refillsLeft <= 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
//               }`}>
//                 {med.refillsLeft} refills left
//               </div>
//             </div>
//             <div className="flex items-center justify-between mt-3">
//               <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                 Take in the {med.timeOfDay}
//               </span>
//               {med.refillsLeft <= 1 && (
//                 <button className="text-xs text-blue-600 hover:underline">
//                   Request Refill
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Activity Feed
// const ActivityFeed = ({ activities }) => {
//   const { darkMode } = useDashboard();
  
//   const getTypeIcon = (type) => {
//     switch(type) {
//       case 'lab': return <FileText className="w-4 h-4" />;
//       case 'appointment': return <Calendar className="w-4 h-4" />;
//       case 'medication': return <Pill className="w-4 h-4" />;
//       case 'message': return <Bell className="w-4 h-4" />;
//       default: return <Activity className="w-4 h-4" />;
//     }
//   };
  
//   const getTypeColor = (type) => {
//     switch(type) {
//       case 'lab': return 'bg-purple-100 text-purple-600';
//       case 'appointment': return 'bg-blue-100 text-blue-600';
//       case 'medication': return 'bg-green-100 text-green-600';
//       case 'message': return 'bg-orange-100 text-orange-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };
  
//   return (
//     <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           Recent Activity
//         </h3>
//       </div>
//       <div className="space-y-4">
//         {activities?.map((activity) => (
//           <div key={activity.id} className="flex items-start gap-3">
//             <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
//               {getTypeIcon(activity.type)}
//             </div>
//             <div className="flex-1">
//               <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 {activity.action}
//               </p>
//               <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
//                 {activity.description}
//               </p>
//               <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
//                 {activity.time}
//               </p>
//             </div>
//             <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Sidebar Component
// const Sidebar = ({ isOpen, onClose }) => {
//   const { darkMode } = useDashboard();
  
//   const navItems = [
//     { icon: Home, label: 'Dashboard', href: '#' },
//     { icon: Calendar, label: 'Appointments', href: '#' },
//     { icon: Pill, label: 'Medications', href: '#' },
//     { icon: FileText, label: 'Medical Records', href: '#' },
//     { icon: Activity, label: 'Health Tracking', href: '#' },
//     { icon: Bell, label: 'Messages', href: '#', badge: 3 }
//   ];
  
//   return (
//     <>
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}
      
//       <aside
//         className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 ${
//           darkMode ? 'bg-gray-900' : 'bg-white'
//         } border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} 
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Heart className="w-5 h-5 text-white" />
//               </div>
//               <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 HealthCare
//               </h1>
//             </div>
//             <button
//               onClick={onClose}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//             {navItems.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <a
//                   key={index}
//                   href={item.href}
//                   className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
//                     ${index === 0 
//                       ? 'bg-blue-600 text-white' 
//                       : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
//                     }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </div>
//                   {item.badge && (
//                     <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {item.badge}
//                     </span>
//                   )}
//                 </a>
//               );
//             })}
//           </nav>
          
//           <div className="p-4 border-t border-gray-200 dark:border-gray-800">
//             <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
//               <AlertCircle className="w-5 h-5" />
//               <span className="font-semibold">Emergency</span>
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// // Navbar Component
// const Navbar = ({ onMenuClick, onLogout }) => {
//   const { darkMode, toggleDarkMode, patientInfo } = useDashboard();
//   const [showProfile, setShowProfile] = useState(false);
  
//   return (
//     <header 
//       className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-900' : 'bg-white'} 
//       border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} px-6 py-4`}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onMenuClick}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             <Menu className="w-5 h-5" />
//           </button>
          
//           <div>
//             <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               Welcome back, {patientInfo?.firstName}
//             </h2>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Patient ID: {patientInfo?.patientId}
//             </p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </button>
          
//           <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//           </button>
          
//           <div className="relative">
//             <button
//               onClick={() => setShowProfile(!showProfile)}
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">
//                   {patientInfo?.firstName?.[0]}{patientInfo?.lastName?.[0]}
//                 </span>
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {patientInfo?.firstName} {patientInfo?.lastName}
//                 </p>
//                 <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {patientInfo?.email}
//                 </p>
//               </div>
//             </button>
            
//             {showProfile && (
//               <div className={`absolute right-0 mt-2 w-56 ${darkMode ? 'bg-gray-800' : 'bg-white'} 
//                 rounded-lg shadow-lg py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//               >
//                 <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
//                   <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {patientInfo?.firstName} {patientInfo?.lastName}
//                   </p>
//                   <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     DOB: {patientInfo?.dateOfBirth}
//                   </p>
//                 </div>
//                 <button 
//                   className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
//                     ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                 >
//                   Profile Settings
//                 </button>
//                 <button 
//                   className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
//                     ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                 >
//                   Privacy & Security
//                 </button>
//                 <hr className="my-2 border-gray-200 dark:border-gray-700" />
//                 <button 
//                   onClick={onLogout}
//                   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Main Dashboard Component
// const Dashboard = ({ onLogout }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [patientInfo] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     patientId: 'PT-2025-00123',
//     email: 'john.doe@email.com',
//     dateOfBirth: '01/15/1985'
//   });
  
//   const { data: vitals, loading: vitalsLoading } = useApi('/patient/vitals', []);
//   const { data: appointments, loading: appointmentsLoading } = useApi('/patient/appointments', []);
//   const { data: medications, loading: medicationsLoading } = useApi('/patient/medications', []);
//   const { data: activities, loading: activitiesLoading } = useApi('/patient/activity', []);
  
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);
  
//   const toggleDarkMode = () => setDarkMode(!darkMode);
  
//   return (
//     <DashboardContext.Provider value={{ darkMode, toggleDarkMode, patientInfo }}>
//       <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
//         <div className="flex h-screen overflow-hidden">
//           <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <Navbar onMenuClick={() => setSidebarOpen(true)} onLogout={onLogout} />
            
//             <main className="flex-1 overflow-y-auto p-6">
//               <div className="max-w-7xl mx-auto space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {vitalsLoading ? (
//                     <LoadingState />
//                   ) : (
//                     <>
//                       <VitalCard
//                         title="Blood Pressure"
//                         value={`${vitals?.bloodPressure.systolic}/${vitals?.bloodPressure.diastolic}`}
//                         status={vitals?.bloodPressure.status}
//                         icon={Heart}
//                         subtitle={vitals?.bloodPressure.lastUpdated}
//                       />
//                       <VitalCard
//                         title="Heart Rate"
//                         value={vitals?.heartRate.value}
//                         unit="bpm"
//                         status={vitals?.heartRate.status}
//                         icon={Activity}
//                         subtitle={vitals?.heartRate.lastUpdated}
//                       />
//                       <VitalCard
//                         title="Temperature"
//                         value={vitals?.temperature.value}
//                         unit={vitals?.temperature.unit}
//                         status={vitals?.temperature.status}
//                         icon={Activity}
//                         subtitle={vitals?.temperature.lastUpdated}
//                       />
//                       <VitalCard
//                         title="Weight"
//                         value={vitals?.weight.value}
//                         unit={vitals?.weight.unit}
//                         status="normal"
//                         icon={Activity}
//                         subtitle={`${vitals?.weight.change} lbs from last visit`}
//                       />
//                     </>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {appointmentsLoading ? (
//                     <LoadingState />
//                   ) : (
//                     <AppointmentsList appointments={appointments} />
//                   )}
                  
//                   {medicationsLoading ? (
//                     <LoadingState />
//                   ) : (
//                     <MedicationsList medications={medications} />
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
//                   {activitiesLoading ? (
//                     <LoadingState />
//                   ) : (
//                     <ActivityFeed activities={activities} />
//                   )}
//                 </div>
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </DashboardContext.Provider>
//   );
// };

// export default Dashboard;