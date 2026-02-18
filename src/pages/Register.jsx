import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import logo from '../assets/Iaeste Logo Standard 2.png';
import verticalLogo from '../assets/logo-removebg-preview 1.png';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        registrationNumber: '',
        email: '',
        whatsappNumber: '',
        course: '',
        branchSection: '',
        semester: '',
        memberType: 'in-station', // default
        universityName: '',
        universityState: '',
        universityCity: '',
        universityPincode: '',
        universityAddress: '',
        bonafide: false,
        enrollmentCertificate: false,
        termsAccepted: false
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        document.title = "Register | IAESTE LC JECRC";
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        setShowSuccessModal(true);
        // Here you would typically send data to backend
        console.log('Registration Data:', formData);
    };

    // --- Modals & Components ---

    const PaymentModal = () => (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all scale-100">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0B3D59]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B3D59]">Payment Gateway</h3>
                    <p className="text-gray-500 mt-2">Complete your registration payment</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Membership Type</span>
                        <span className="text-[#0B3D59] font-bold capitalize">{formData.memberType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-800 font-bold">Total Amount</span>
                        <span className="text-[#0B3D59] font-bold">
                            {formData.memberType === 'in-station' ? '₹2900' : '₹2000'}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handlePaymentSuccess}
                    className="w-full bg-[#0B3D59] hover:bg-[#072a3f] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#0B3D59]/20 hover:shadow-[#0B3D59]/40 transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                    Pay & Register
                </button>
                <button
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    const SuccessModal = () => (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#0B3D59] mb-4">Registration Successful!</h3>

                <div className="space-y-4 text-gray-600 mb-8 text-left bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#0B3D59] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm">Credentials for the <strong>Member Portal</strong> will be shared within <strong>24 hours</strong> via message/email.</p>
                    </div>
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#0B3D59] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <p className="text-sm">A <strong>WhatsApp Community</strong> invitation has been sent to your registered email.</p>
                    </div>
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#0B3D59] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <p className="text-sm">For further information reach out to: <a href="tel:+911234567890" className="text-[#0B3D59] font-bold hover:underline">+91 123 456 7890</a></p>
                    </div>
                </div>

                <Link
                    to="/"
                    className="block w-full bg-[#0B3D59] hover:bg-[#072a3f] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#0B3D59]/20 transition-all"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen font-outfit bg-gradient-to-br from-[#0B3D59] via-[#002b4d] to-[#001529]">
            {/* Top Left Logo */}
            <div className="absolute top-6 left-6 z-50">
                <Link to="/login">
                    <img
                        src={logo}
                        alt="IAESTE Logo"
                        className="h-16 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                </Link>
            </div>

            <main className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#0B3D59] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#002b4d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-[#0B3D59]/20">

                    {/* Left Side - Visual/Brand */}
                    <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-slate-50 to-blue-50 flex-col items-center justify-center p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(#0B3D59_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

                        {/* Floating Logo Effect */}
                        <div className="relative z-10 mb-8 transform transition-transform duration-700 hover:scale-110 hover:rotate-3">
                            <img
                                src={verticalLogo}
                                alt="IAESTE Logo"
                                className="w-40 object-contain drop-shadow-2xl filter"
                            />
                        </div>

                        <div className="text-center z-10">
                            <h2 className="text-2xl font-bold text-[#0B3D59] mb-2">Join IAESTE</h2>
                            <p className="text-gray-600 italic font-medium">"Work. Experience. Discover."</p>
                            <div className="mt-8 space-y-4 text-left">
                                <div className="flex items-center text-sm text-gray-700">
                                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#0B3D59] flex items-center justify-center mr-3 font-bold">1</span>
                                    Global Internships
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#0B3D59] flex items-center justify-center mr-3 font-bold">2</span>
                                    Cultural Exchange
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#0B3D59] flex items-center justify-center mr-3 font-bold">3</span>
                                    Professional Growth
                                </div>
                            </div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#0B3D59]/10 rounded-full blur-xl"></div>
                        <div className="absolute top-12 right-12 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white relative">
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-[#0B3D59] mb-2 flex items-center gap-3">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                                Registration
                            </h3>
                            <p className="text-gray-500 text-sm">Create your comprehensive profile to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Full Name</label>
                                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="John Doe" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Registration No.</label>
                                    <input required type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="20XXXXXX" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Email Address</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="john@example.com" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">WhatsApp Number</label>
                                    <input required type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="+91 XXXXX XXXXX" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Course</label>
                                    <input required type="text" name="course" value={formData.course} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="B.Tech" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Branch/Section</label>
                                    <input required type="text" name="branchSection" value={formData.branchSection} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="CSE-A" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Semester</label>
                                    <select name="semester" value={formData.semester} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all bg-white">
                                        <option value="">Select</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>{sem}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Member Type Selection */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <label className="block text-xs font-bold text-[#0B3D59] uppercase tracking-wider mb-3">Membership Type</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 relative cursor-pointer p-3 border rounded-lg transition-all ${formData.memberType === 'in-station' ? 'bg-[#0B3D59] border-[#0B3D59] text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[#0B3D59]'}`}>
                                        <input type="radio" name="memberType" value="in-station" checked={formData.memberType === 'in-station'} onChange={handleInputChange} className="hidden" />
                                        <div className="text-center">
                                            <span className="block font-bold text-sm">In-Station</span>
                                            <span className={`text-xs ${formData.memberType === 'in-station' ? 'text-blue-200' : 'text-gray-400'}`}>(₹2900 (Till Graduation))</span>
                                        </div>
                                    </label>
                                    <label className={`flex-1 relative cursor-pointer p-3 border rounded-lg transition-all ${formData.memberType === 'out-station' ? 'bg-[#0B3D59] border-[#0B3D59] text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[#0B3D59]'}`}>
                                        <input type="radio" name="memberType" value="out-station" checked={formData.memberType === 'out-station'} onChange={handleInputChange} className="hidden" />
                                        <div className="text-center">
                                            <span className="block font-bold text-sm">Out-Station</span>
                                            <span className={`text-xs ${formData.memberType === 'out-station' ? 'text-blue-200' : 'text-gray-400'}`}>(₹2000 (1 Year))</span>
                                        </div>
                                    </label>
                                </div>

                                {/* Conditional Fields for Out-Station */}
                                {formData.memberType === 'out-station' && (
                                    <div className="mt-4 space-y-4 animate-fade-in-down">

                                        {/* University Details */}
                                        <div className="space-y-4 p-4 bg-white rounded-xl border border-gray-200">
                                            <h4 className="text-sm font-bold text-[#0B3D59] uppercase tracking-wider mb-2">University Details</h4>

                                            <div className="group">
                                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">University Name</label>
                                                <input required type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="University Name" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="group">
                                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">State</label>
                                                    <input required type="text" name="universityState" value={formData.universityState} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="State" />
                                                </div>
                                                <div className="group">
                                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">City</label>
                                                    <input required type="text" name="universityCity" value={formData.universityCity} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="City" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-1 group">
                                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Pincode</label>
                                                    <input required type="text" name="universityPincode" value={formData.universityPincode} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="Pincode" />
                                                </div>
                                                <div className="col-span-2 group">
                                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 group-focus-within:text-[#0B3D59] transition-colors">Address</label>
                                                    <input required type="text" name="universityAddress" value={formData.universityAddress} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20 focus:border-[#0B3D59] transition-all" placeholder="University Address" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Declarations */}
                                        <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                                            <div className="flex items-center h-5">
                                                <input id="bonafide" name="bonafide" type="checkbox" checked={formData.bonafide} onChange={handleInputChange} className="w-4 h-4 rounded border-gray-300 text-[#0B3D59] focus:ring-[#0B3D59]" required />
                                            </div>
                                            <div className="ml-3 text-xs text-gray-600">
                                                <label htmlFor="bonafide" className="font-medium text-gray-800">Bonafide Certificate</label>
                                                <p>I confirm that the Bonafide Certificate will be provided by my university at the time of applying for the internship.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                                            <div className="flex items-center h-5">
                                                <input id="enrollmentCertificate" name="enrollmentCertificate" type="checkbox" checked={formData.enrollmentCertificate} onChange={handleInputChange} className="w-4 h-4 rounded border-gray-300 text-[#0B3D59] focus:ring-[#0B3D59]" required />
                                            </div>
                                            <div className="ml-3 text-xs text-gray-600">
                                                <label htmlFor="enrollmentCertificate" className="font-medium text-gray-800">Enrollment Certificate (COE)</label>
                                                <p>I confirm that the Enrollment Certificate will be provided by my university at the time of applying for the internship.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleInputChange} className="w-4 h-4 rounded border-gray-300 text-[#0B3D59] focus:ring-[#0B3D59]" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-medium text-gray-700">I agree to the <a href="#" className="text-[#0B3D59] hover:underline">Terms and Conditions</a></label>
                                    </div>
                                </div>

                                {/* Video Guidelines Section */}
                                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200 group relative">
                                    {!isVideoPlaying ? (
                                        <div
                                            className="w-full h-32 flex flex-col items-center justify-center bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"
                                            onClick={() => setIsVideoPlaying(true)}
                                        >
                                            <div className="w-12 h-12 bg-[#0B3D59] rounded-full flex items-center justify-center text-white mb-2 shadow-lg group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600">Watch Guidelines Video</span>
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-black flex items-center justify-center relative">
                                            <p className="text-gray-400 text-sm">Video Player Placeholder</p>
                                            <button
                                                onClick={() => setIsVideoPlaying(false)}
                                                className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/80"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#0B3D59] hover:bg-[#072a3f] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-[#0B3D59]/20 hover:shadow-[#0B3D59]/40 transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 tracking-wide uppercase text-sm">
                                Submit Registration
                            </button>

                            <div className="text-center text-sm text-gray-500">
                                Already have an account? <Link to="/login" className="text-[#0B3D59] font-semibold hover:underline">Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modals */}
                {showPaymentModal && <PaymentModal />}
                {showSuccessModal && <SuccessModal />}
            </main>
            <Footer />
        </div>
    );
};

export default Register;
