import React, { useState } from 'react';
import { Pill, Clock, Calendar, CheckCircle, Bell, AlertCircle, User, FileText, ChevronDown, ChevronUp, Download, MessageSquare, X } from 'lucide-react';

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
  const [expanded, setExpanded] = useState(false);
  const isNew = prescription.status === 'new' && !prescription.accepted;

  return (
    <div className={`bg-white rounded-xl border-2 transition-all duration-200 ${
      isNew ? 'border-purple-300 shadow-lg' : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
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
              <h3 className="text-lg font-bold text-gray-900">Prescription #{prescription.prescriptionNumber}</h3>
            </div>
            <StatusBadge status={prescription.status} />
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm text-gray-500">Prescribed Date</p>
            <p className="text-sm font-semibold text-gray-900">{new Date(prescription.prescribedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-1">{prescription.doctor.name}</h4>
              <p className="text-sm text-gray-600">{prescription.doctor.specialty}</p>
              <p className="text-xs text-gray-500 mt-1">{prescription.doctor.hospital}</p>
              <p className="text-xs text-blue-600 mt-1 font-medium">{prescription.doctor.phone}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h4 className="font-semibold text-gray-900">Diagnosis</h4>
          </div>
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{prescription.diagnosis}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Prescribed Medications ({prescription.medications.length})</h4>
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
            {prescription.medications.map((med, index) => (
              <div key={med.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <Pill className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 mb-1">{med.name}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <span className="text-gray-500">Dosage:</span>
                        <span className="ml-2 font-medium text-gray-900">{med.dosage}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Frequency:</span>
                        <span className="ml-2 font-medium text-gray-900">{med.frequency}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-medium text-gray-900">{med.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <span className="ml-2 font-medium text-gray-900">{med.quantity} tablets</span>
                      </div>
                    </div>

                    {expanded && (
                      <div className="mt-3 space-y-2 pt-3 border-t border-gray-200">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Instructions</p>
                          <p className="text-xs text-blue-800">{med.instructions}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-amber-900 mb-1">Important Warnings</p>
                              <p className="text-xs text-amber-800">{med.warnings}</p>
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
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-yellow-900 mb-1">Doctor's Notes</p>
                <p className="text-sm text-yellow-800">{prescription.notes}</p>
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
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const PrescriptionDetails = ({ prescription }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Prescription #{prescription.prescriptionNumber}</h3>
            <p className="text-sm text-gray-600 mt-1">Issued on {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
          </div>
          <StatusBadge status={prescription.status} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Prescribed By</p>
            <p className="font-semibold text-gray-900">{prescription.doctor.name}</p>
            <p className="text-sm text-gray-600">{prescription.doctor.specialty}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Hospital</p>
            <p className="font-semibold text-gray-900">{prescription.doctor.hospital}</p>
            <p className="text-sm text-blue-600">{prescription.doctor.phone}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Diagnosis</h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700">{prescription.diagnosis}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Medications ({prescription.medications.length})</h4>
        <div className="space-y-4">
          {prescription.medications.map((med) => (
            <div key={med.id} className="border-2 border-gray-200 rounded-lg p-5 bg-white">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{med.name}</h5>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Dosage</p>
                      <p className="font-semibold text-gray-900">{med.dosage}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
                      <p className="font-semibold text-gray-900">{med.frequency}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900">{med.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Quantity</p>
                      <p className="font-semibold text-gray-900">{med.quantity} tablets</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900 mb-2">How to Take</p>
                      <p className="text-sm text-blue-800">{med.instructions}</p>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900 mb-2">Important Warnings</p>
                          <p className="text-sm text-amber-800">{med.warnings}</p>
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
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-2">Additional Notes from Doctor</p>
              <p className="text-sm text-yellow-800">{prescription.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientPrescriptionDashboard = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Prescriptions</h1>
              <p className="text-gray-600 mt-1">View and manage prescriptions from your doctors</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700 border-gray-200' },
              { key: 'new', label: 'New', color: 'bg-purple-100 text-purple-700 border-purple-200' },
              { key: 'active', label: 'Active', color: 'bg-green-100 text-green-700 border-green-200' },
              { key: 'expired', label: 'Expired', color: 'bg-gray-100 text-gray-600 border-gray-200' }
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
          <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600">You don't have any {filterStatus !== 'all' ? filterStatus : ''} prescriptions at the moment.</p>
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
    </div>
  );
};

export default PatientPrescriptionDashboard;