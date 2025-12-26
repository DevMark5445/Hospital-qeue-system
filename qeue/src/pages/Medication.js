import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Pill, Clock, Calendar, CheckCircle, Bell, AlertCircle, User, FileText, 
  ChevronDown, ChevronUp, Download, MessageSquare, X, Menu, Sun, Moon, 
  LogOut, Home, Activity, Heart
} from 'lucide-react';

// Dashboard Context
const DashboardContext = createContext();

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};

const initialPrescriptions = [
  {
    id: 1,
    prescriptionNumber: 'RX-2024-001234',
    status: 'active',
    prescribedDate: '2024-12-20',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      hospital: 'City Medical Center',
      phone: '+254 712 345 678'
    },
    medications: [
      {
        id: 101,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '90 days',
        quantity: 90,
        instructions: 'Take in the morning with food',
        warnings: 'May cause dizziness. Avoid alcohol.'
      },
      {
        id: 102,
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        duration: '90 days',
        quantity: 90,
        instructions: 'Take with food to reduce stomach irritation',
        warnings: 'Contact doctor if unusual bleeding occurs'
      }
    ],
    diagnosis: 'Hypertension Management',
    notes: 'Regular blood pressure monitoring required. Follow-up appointment in 4 weeks.',
    viewed: true,
    accepted: true
  },
  {
    id: 2,
    prescriptionNumber: 'RX-2024-001456',
    status: 'new',
    prescribedDate: '2024-12-24',
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Endocrinologist',
      hospital: 'Metro Health Clinic',
      phone: '+254 723 456 789'
    },
    medications: [
      {
        id: 201,
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '60 days',
        quantity: 120,
        instructions: 'Take with breakfast and dinner. Drink plenty of water.',
        warnings: 'May cause nausea initially. Contact doctor if severe stomach pain.'
      }
    ],
    diagnosis: 'Type 2 Diabetes - Initial Treatment',
    notes: 'Start with low dose. Monitor blood sugar levels daily. Dietary consultation scheduled.',
    viewed: false,
    accepted: false
  },
  {
    id: 3,
    prescriptionNumber: 'RX-2024-001289',
    status: 'active',
    prescribedDate: '2024-12-15',
    doctor: {
      name: 'Dr. Emily Rodriguez',
      specialty: 'General Practitioner',
      hospital: 'Wellness Medical Center',
      phone: '+254 734 567 890'
    },
    medications: [
      {
        id: 301,
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '90 days',
        quantity: 90,
        instructions: 'Take at bedtime. Avoid grapefruit and grapefruit juice.',
        warnings: 'Report any unexplained muscle pain or weakness'
      }
    ],
    diagnosis: 'High Cholesterol',
    notes: 'Cholesterol levels will be rechecked in 8 weeks. Continue healthy diet and exercise.',
    viewed: true,
    accepted: true
  },
  {
    id: 4,
    prescriptionNumber: 'RX-2024-001567',
    status: 'expired',
    prescribedDate: '2024-09-20',
    doctor: {
      name: 'Dr. James Wilson',
      specialty: 'General Practitioner',
      hospital: 'City Medical Center',
      phone: '+254 745 678 901'
    },
    medications: [
      {
        id: 401,
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days',
        quantity: 21,
        instructions: 'Take with or without food. Complete full course.',
        warnings: 'Stop if allergic reaction occurs'
      }
    ],
    diagnosis: 'Bacterial Infection',
    notes: 'Complete full course of antibiotics even if feeling better.',
    viewed: true,
    accepted: true
  }
];

// Sidebar Component
const Sidebar = ({ isOpen, onClose, currentPage }) => {
  const { darkMode } = useDashboard();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '#appointments' },
    { icon: Pill, label: 'Medications', href: '#medications' },
    { icon: FileText, label: 'Medical Records', href: '#records' },
    { icon: Activity, label: 'Health Tracking', href: '#tracking' },
    { icon: Bell, label: 'Messages', href: '#messages', badge: 3 }
  ];
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                MediQeue
              </h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.label === currentPage;
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue-600 text-white' 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Emergency</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Navbar Component
const Navbar = ({ onMenuClick }) => {
  const { darkMode, toggleDarkMode, patientInfo } = useDashboard();
  const [showProfile, setShowProfile] = useState(false);
  
  return (
    <header 
      className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-900' : 'bg-white'} 
      border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} px-6 py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Medications
            </h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your prescriptions and medications
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {patientInfo?.firstName?.[0]}{patientInfo?.lastName?.[0]}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patientInfo?.firstName} {patientInfo?.lastName}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {patientInfo?.email}
                </p>
              </div>
            </button>
            
            {showProfile && (
              <div className={`absolute right-0 mt-2 w-56 ${darkMode ? 'bg-gray-800' : 'bg-white'} 
                rounded-lg shadow-lg py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {patientInfo?.firstName} {patientInfo?.lastName}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Patient ID: {patientInfo?.patientId}
                  </p>
                </div>
                <button 
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Profile Settings
                </button>
                <button 
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Privacy & Security
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button 
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    new: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
      label: 'New Prescription',
      icon: Bell
    },
    active: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      label: 'Active',
      icon: CheckCircle
    },
    expired: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      label: 'Expired',
      icon: Clock
    }
  };

  const config = statusConfig[status] || statusConfig.active;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

const PrescriptionCard = ({ prescription, onViewDetails, onAccept }) => {
  const { darkMode } = useDashboard();
  const [expanded, setExpanded] = useState(false);
  const isNew = prescription.status === 'new' && !prescription.accepted;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border-2 transition-all duration-200 ${
      isNew ? 'border-purple-300 shadow-lg' : `${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:border-blue-300 hover:shadow-md`
    }`}>
      {isNew && (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-t-xl">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">New Prescription from {prescription.doctor.name}</span>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prescription #{prescription.prescriptionNumber}</h3>
            </div>
            <StatusBadge status={prescription.status} />
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Prescribed Date</p>
            <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(prescription.prescribedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 mb-4 border ${darkMode ? 'border-gray-600' : 'border-blue-100'}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-lg`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{prescription.doctor.name}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{prescription.doctor.specialty}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{prescription.doctor.hospital}</p>
              <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-1 font-medium`}>{prescription.doctor.phone}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Diagnosis</h4>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'} p-3 rounded-lg`}>{prescription.diagnosis}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prescribed Medications ({prescription.medications.length})</h4>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {expanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {prescription.medications.map((med) => (
              <div key={med.id} className={`border ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} rounded-lg p-4`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <Pill className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{med.name}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Dosage:</span>
                        <span className={`ml-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.dosage}</span>
                      </div>
                      <div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Frequency:</span>
                        <span className={`ml-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.frequency}</span>
                      </div>
                      <div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Duration:</span>
                        <span className={`ml-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.duration}</span>
                      </div>
                      <div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Quantity:</span>
                        <span className={`ml-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.quantity} tablets</span>
                      </div>
                    </div>

                    {expanded && (
                      <div className="mt-3 space-y-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-3`}>
                          <p className={`text-xs font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-900'} mb-1`}>Instructions</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>{med.instructions}</p>
                        </div>
                        <div className={`${darkMode ? 'bg-amber-900/30' : 'bg-amber-50'} rounded-lg p-3`}>
                          <div className="flex items-start gap-2">
                            <AlertCircle className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'} flex-shrink-0 mt-0.5`} />
                            <div>
                              <p className={`text-xs font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-900'} mb-1`}>Important Warnings</p>
                              <p className={`text-xs ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>{med.warnings}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {prescription.notes && (
          <div className={`mb-4 ${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
            <div className="flex items-start gap-2">
              <MessageSquare className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`text-xs font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-900'} mb-1`}>Doctor's Notes</p>
                <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>{prescription.notes}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {isNew ? (
            <>
              <button
                onClick={() => onAccept(prescription.id)}
                className="flex-1 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Accept Prescription
              </button>
              <button
                onClick={() => onViewDetails(prescription)}
                className="px-4 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View Full Details
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onViewDetails(prescription)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View Details
              </button>
              <button
                className={`px-4 py-3 border-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium rounded-lg transition-colors flex items-center justify-center gap-2`}
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  const { darkMode } = useDashboard();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto`}>
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between z-10`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
            <button
              onClick={onClose}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const PrescriptionDetails = ({ prescription }) => {
  const { darkMode } = useDashboard();
  
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} rounded-lg p-6 border`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prescription #{prescription.prescriptionNumber}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Issued on {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
          </div>
          <StatusBadge status={prescription.status} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Prescribed By</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prescription.doctor.name}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{prescription.doctor.specialty}</p>
          </div>
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Hospital</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prescription.doctor.hospital}</p>
            <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{prescription.doctor.phone}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Diagnosis</h4>
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{prescription.diagnosis}</p>
        </div>
      </div>

      <div>
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Medications ({prescription.medications.length})</h4>
        <div className="space-y-4">
          {prescription.medications.map((med) => (
            <div key={med.id} className={`border-2 ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-white'} rounded-lg p-5`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} rounded-lg`}>
                  <Pill className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <h5 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{med.name}</h5>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Dosage</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.dosage}</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Frequency</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.frequency}</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Duration</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.duration}</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Quantity</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{med.quantity} tablets</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg p-4 border`}>
                      <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-900'} mb-2`}>How to Take</p>
                      <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>{med.instructions}</p>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'} rounded-lg p-4 border`}>
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'} flex-shrink-0 mt-0.5`} />
                        <div>
                          <p className={`text-sm font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-900'} mb-2`}>Important Warnings</p>
                          <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>{med.warnings}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {prescription.notes && (
        <div className={`${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border-2 rounded-lg p-5`}>
          <div className="flex items-start gap-3">
            <MessageSquare className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} flex-shrink-0 mt-0.5`} />
            <div>
              <p className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-900'} mb-2`}>Additional Notes from Doctor</p>
              <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>{prescription.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientPrescriptionDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    patientId: 'PT-2025-00123',
    email: 'john.doe@email.com',
    dateOfBirth: '01/15/1985'
  });
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredPrescriptions = prescriptions.filter(rx => 
    filterStatus === 'all' || rx.status === filterStatus
  );

  const newPrescriptionsCount = prescriptions.filter(rx => rx.status === 'new' && !rx.accepted).length;

  const handleAccept = (id) => {
    setPrescriptions(prev =>
      prev.map(rx => rx.id === id ? { ...rx, accepted: true, viewed: true, status: 'active' } : rx)
    );
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
    if (!prescription.viewed) {
      setPrescriptions(prev =>
        prev.map(rx => rx.id === prescription.id ? { ...rx, viewed: true } : rx)
      );
    }
  };

  const statusCounts = {
    all: prescriptions.length,
    new: prescriptions.filter(rx => rx.status === 'new').length,
    active: prescriptions.filter(rx => rx.status === 'active').length,
    expired: prescriptions.filter(rx => rx.status === 'expired').length
  };

  return (
    <DashboardContext.Provider value={{ darkMode, toggleDarkMode, patientInfo }}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPage="Medications" />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                {newPrescriptionsCount > 0 && (
                  <div className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-6 h-6 animate-pulse" />
                      <div>
                        <h3 className="font-bold text-lg">You have {newPrescriptionsCount} new prescription{newPrescriptionsCount > 1 ? 's' : ''}!</h3>
                        <p className="text-sm text-white/90 mt-1">Please review and accept your new prescriptions below</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Prescriptions</h1>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>View and manage prescriptions from your doctors</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { key: 'all', label: 'All', color: darkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200' },
                      { key: 'new', label: 'New', color: darkMode ? 'bg-purple-900/40 text-purple-300 border-purple-800' : 'bg-purple-100 text-purple-700 border-purple-200' },
                      { key: 'active', label: 'Active', color: darkMode ? 'bg-green-900/40 text-green-300 border-green-800' : 'bg-green-100 text-green-700 border-green-200' },
                      { key: 'expired', label: 'Expired', color: darkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200' }
                    ].map(({ key, label, color }) => (
                      <button
                        key={key}
                        onClick={() => setFilterStatus(key)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          filterStatus === key
                            ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                            : 'border-transparent hover:border-gray-300'
                        } ${color}`}
                      >
                        <div className="text-2xl sm:text-3xl font-bold mb-1">
                          {statusCounts[key]}
                          {key === 'new' && statusCounts[key] > 0 && (
                            <span className="ml-2 inline-flex items-center justify-center w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredPrescriptions.length === 0 ? (
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border-2 p-12 text-center`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full mb-4`}>
                      <FileText className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No prescriptions found</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>You don't have any {filterStatus !== 'all' ? filterStatus : ''} prescriptions at the moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredPrescriptions.map(prescription => (
                      <PrescriptionCard
                        key={prescription.id}
                        prescription={prescription}
                        onViewDetails={handleViewDetails}
                        onAccept={handleAccept}
                      />
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPrescription(null);
        }}
        title="Prescription Details"
      >
        {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} />}
      </Modal>
    </DashboardContext.Provider>
  );
};

export default PatientPrescriptionDashboard;