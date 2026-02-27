import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Loader2, Search, Filter, X,
  Activity, Heart, Pill, FileText, Menu, Bell, Sun, Moon, LogOut, Home, ChevronRight
} from 'lucide-react';

// ============================================================================
// CONTEXT
// ============================================================================

const AppointContext = createContext();

const useAppoint = () => {
  const context = useContext(AppointContext);
  if (!context) throw new Error('useAppoint must be used within AppointProvider');
  return context;
};

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

const Sidebar = ({ isOpen, onClose }) => {
  const { darkMode } = useAppoint();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '/appoint' },
    { icon: Pill, label: 'Medications', href: '/medication' },
    { icon: FileText, label: 'Medical Records', href: '#' },
    { icon: Activity, label: 'Health Tracking', href: '#' },
    { icon: Bell, label: 'Messages', href: '#', badge: 3 }
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
              const isActive = item.href === '/appoint';
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

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================

const Navbar = ({ onMenuClick }) => {
  const { darkMode, toggleDarkMode, patientInfo } = useAppoint();
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
              Appointment Management
            </h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Patient ID: {patientInfo?.patientId}
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
                    DOB: {patientInfo?.dateOfBirth}
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

// ============================================================================
// MOCK DATA & API SERVICE LAYER
// ============================================================================

const DEPARTMENTS = [
  { id: 1, name: 'Cardiology', icon: '❤️' },
  { id: 2, name: 'Neurology', icon: '🧠' },
  { id: 3, name: 'Orthopedics', icon: '🦴' },
  { id: 4, name: 'Pediatrics', icon: '👶' },
  { id: 5, name: 'Dermatology', icon: '✨' },
  { id: 6, name: 'Malaria', icon: '✨' }
];

const DOCTORS = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', departmentId: 1, image: '👩‍⚕️', availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', departmentId: 2, image: '👨‍⚕️', availability: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Orthopedic Surgeon', departmentId: 3, image: '👩‍⚕️', availability: ['09:00', '11:00', '13:00', '15:00', '16:00'] },
  { id: 4, name: 'Dr. David Kim', specialization: 'Pediatrician', departmentId: 4, image: '👨‍⚕️', availability: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', departmentId: 5, image: '👩‍⚕️', availability: ['10:00', '11:00', '14:00', '15:00', '16:00'] }
];

const appointmentService = {
  appointments: [],
  bookedSlots: {},

  async getAppointments() {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.appointments;
  },

  async createAppointment(data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const appointment = {
      id: Date.now(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.appointments.push(appointment);
    
    const slotKey = `${data.doctorId}-${data.date}-${data.timeSlot}`;
    this.bookedSlots[slotKey] = true;
    
    return appointment;
  },

  async updateAppointment(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...updates };
      return this.appointments[index];
    }
    throw new Error('Appointment not found');
  },

  isSlotBooked(doctorId, date, timeSlot) {
    const slotKey = `${doctorId}-${date}-${timeSlot}`;
    return this.bookedSlots[slotKey] || false;
  }
};

// UTILITY COMPONENTS

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300', icon: AlertCircle },
    confirmed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300', icon: CheckCircle },
    completed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300', icon: CheckCircle },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300', icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
    ))}
  </div>
);

const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Icon className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 max-w-md">{description}</p>
  </div>
);

const Alert = ({ type = 'info', message, onClose }) => {
  const alertConfig = {
    success: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-800 dark:text-green-300' },
    error: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-300' },
    info: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-300' }
  };

  const config = alertConfig[type];

  return (
    <div className={`${config.bg} border ${config.border} ${config.text} px-4 py-3 rounded-lg flex items-center justify-between mb-4`} role="alert">
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4" aria-label="Close alert">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ============================================================================
// DOCTOR CARD COMPONENT
// ============================================================================

const DoctorCard = ({ doctor, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
      selected
        ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
    }`}
    aria-pressed={selected}
  >
    <div className="flex items-start gap-3">
      <span className="text-4xl">{doctor.image}</span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{doctor.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
          <CheckCircle className="w-3 h-3" />
          <span>Available Today</span>
        </div>
      </div>
    </div>
  </button>
);

// ============================================================================
// TIME SLOT SELECTOR COMPONENT
// ============================================================================

const TimeSlotSelector = ({ slots, selectedSlot, onSelect, bookedSlots = [] }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
    {slots.map(slot => {
      const isBooked = bookedSlots.includes(slot);
      const isSelected = selectedSlot === slot;
      
      return (
        <button
          key={slot}
          onClick={() => !isBooked && onSelect(slot)}
          disabled={isBooked}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isBooked
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
          aria-label={`Time slot ${slot}`}
          aria-pressed={isSelected}
        >
          <Clock className="w-3 h-3 inline mr-1" />
          {slot}
        </button>
      );
    })}
  </div>
);

// ============================================================================
// APPOINTMENT MODAL COMPONENT
// ============================================================================

const AppointmentModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    departmentId: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    patientName: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);

  const selectedDoctor = DOCTORS.find(d => d.id === parseInt(formData.doctorId));
  const filteredDoctors = formData.departmentId
    ? DOCTORS.filter(d => d.departmentId === parseInt(formData.departmentId))
    : [];

  useEffect(() => {
    if (selectedDoctor && formData.date) {
      const bookedSlots = selectedDoctor.availability.filter(slot =>
        appointmentService.isSlotBooked(selectedDoctor.id, formData.date, slot)
      );
      setAvailableSlots(bookedSlots);
    }
  }, [selectedDoctor, formData.date]);

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.departmentId) newErrors.departmentId = 'Please select a department';
      if (!formData.doctorId) newErrors.doctorId = 'Please select a doctor';
    }

    if (currentStep === 2) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    }

    if (currentStep === 3) {
      if (!formData.patientName.trim()) newErrors.patientName = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      await onSubmit(formData);
      setFormData({
        departmentId: '',
        doctorId: '',
        date: '',
        timeSlot: '',
        patientName: '',
        phone: '',
        email: '',
        notes: ''
      });
      setStep(1);
    }
  };

  const handleClose = () => {
    setFormData({
      departmentId: '',
      doctorId: '',
      date: '',
      timeSlot: '',
      patientName: '',
      phone: '',
      email: '',
      notes: ''
    });
    setStep(1);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Book Appointment</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>Select Doctor</span>
            <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>Choose Time</span>
            <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>Patient Info</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Department *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DEPARTMENTS.map(dept => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, departmentId: dept.id, doctorId: '' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.departmentId === dept.id
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{dept.icon}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{dept.name}</div>
                    </button>
                  ))}
                </div>
                {errors.departmentId && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.departmentId}</p>}
              </div>

              {filteredDoctors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Doctor *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredDoctors.map(doctor => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        selected={formData.doctorId === doctor.id}
                        onClick={() => setFormData({ ...formData, doctorId: doctor.id })}
                      />
                    ))}
                  </div>
                  {errors.doctorId && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.doctorId}</p>}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Date *
                </label>
                <input
                  type="date"
                  id="date"
                  min={minDate}
                  max={maxDate}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value, timeSlot: '' })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
                {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
              </div>

              {formData.date && selectedDoctor && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Time Slot *
                  </label>
                  <TimeSlotSelector
                    slots={selectedDoctor.availability}
                    selectedSlot={formData.timeSlot}
                    onSelect={(slot) => setFormData({ ...formData, timeSlot: slot })}
                    bookedSlots={availableSlots}
                  />
                  {errors.timeSlot && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.timeSlot}</p>}
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="John Doe"
                />
                {errors.patientName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.patientName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Any specific symptoms or concerns..."
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// APPOINTMENT LIST COMPONENT
// ============================================================================

const AppointmentList = ({ appointments, onStatusChange, isLoading }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No appointments found"
          description={searchTerm ? "Try adjusting your search criteria" : "Book your first appointment to get started"}
        />
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map(appointment => {
            const doctor = DOCTORS.find(d => d.id === appointment.doctorId);
            const department = DEPARTMENTS.find(d => d.id === appointment.departmentId);

            return (
              <div
                key={appointment.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {appointment.email}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {appointment.phone}
                        </p>
                      </div>
                      <StatusBadge status={appointment.status} />
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{doctor?.image}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{doctor?.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{department?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{appointment.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{appointment.timeSlot}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium mb-1">Notes:</p>
                        <p>{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:w-32">
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onStatusChange(appointment.id, 'confirmed')}
                          disabled={isLoading}
                          className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm disabled:opacity-50"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => onStatusChange(appointment.id, 'cancelled')}
                          disabled={isLoading}
                          className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => onStatusChange(appointment.id, 'completed')}
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-50"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN APPOINTMENT PAGE COMPONENT
// ============================================================================

export default function Appoint() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    patientId: 'PT-2025-00123',
    email: 'john.doe@email.com',
    dateOfBirth: '01/15/1985'
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await appointmentService.getAppointments();
        setAppointments(data);
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to load appointments' });
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleCreateAppointment = async (formData) => {
    setIsLoading(true);
    try {
      const appointment = await appointmentService.createAppointment({
        ...formData,
        doctorId: parseInt(formData.doctorId),
        departmentId: parseInt(formData.departmentId)
      });
      setAppointments([...appointments, appointment]);
      setAlert({ type: 'success', message: 'Appointment booked successfully!' });
      setIsModalOpen(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to book appointment' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    setIsLoading(true);
    try {
      const updatedAppointment = await appointmentService.updateAppointment(appointmentId, { status: newStatus });
      setAppointments(appointments.map(apt => apt.id === appointmentId ? updatedAppointment : apt));
      setAlert({ type: 'success', message: `Appointment ${newStatus}!` });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update appointment' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AppointContext.Provider value={{ darkMode, toggleDarkMode, patientInfo }}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
                {alert && (
                  <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                  />
                )}

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book New Appointment
                </button>

                <AppointmentModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleCreateAppointment}
                  isLoading={isLoading}
                />

                <AppointmentList
                  appointments={appointments}
                  onStatusChange={handleStatusChange}
                  isLoading={isLoading}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </AppointContext.Provider>
  );
}