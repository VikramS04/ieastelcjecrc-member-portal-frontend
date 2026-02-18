import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dashboard as DashboardIcon,
    WorkOutline as OffersIcon,
    Assignment as ApplicationsIcon,
    Description as DocumentsIcon,
    EmojiEvents as NominationIcon,
    Assessment as AnalyticsIcon,
    Notifications as NotificationsIcon,
    Person as ProfileIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Search as SearchIcon,
    CheckCircle as CheckCircleIcon,
    AccessTime as TimeIcon,
    LocationOn as LocationIcon,
    Business as CompanyIcon,
    AttachMoney as StipendIcon,
    School as FieldIcon,
    Download as DownloadIcon,
    BookmarkBorder as BookmarkIcon,
    Send as SendIcon,
    Close as CloseIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import logo from '../assets/Iaeste Logo Standard 2.png';

// Register ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// Mock Data
const OFFERS = [
    { id: 1, country: 'Germany', flag: '🇩🇪', company: 'BMW Group', position: 'Software Engineering Intern', duration: '6 Months', stipend: '€1200/mo', field: 'Computer Science', deadline: '2026-03-01', urgent: true },
    { id: 2, country: 'Switzerland', flag: '🇨🇭', company: 'CERN', position: 'Research Assistant', duration: '12 Months', stipend: 'CHF 3500/mo', field: 'Physics / IT', deadline: '2026-03-15', urgent: false },
    { id: 3, country: 'Japan', flag: '🇯🇵', company: 'Toyota', position: 'R&D Intern', duration: '3 Months', stipend: '¥150,000/mo', field: 'Mechanical Eng.', deadline: '2026-02-28', urgent: true },
    { id: 4, country: 'Sweden', flag: '🇸🇪', company: 'Spotify', position: 'Data Science Intern', duration: '6 Months', stipend: 'SEK 25,000/mo', field: 'Data Science', deadline: '2026-04-10', urgent: false },
];

const NOTIFICATIONS = [
    { id: 1, title: 'New Offer Released - Germany', time: '2 hours ago', type: 'offer' },
    { id: 2, title: 'Nomination Packet Deadline', time: '3 days left', type: 'alert' },
    { id: 3, title: 'Document verification approved', time: '1 day ago', type: 'success' },
];

export default function MemberDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const navigate = useNavigate();

    // SEO & Responsive Init
    useEffect(() => {
        document.title = "Member Dashboard | IAESTE LC JECRC";

        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    // --- Components ---

    const Sidebar = () => (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: isMobile ? 280 : (sidebarOpen ? 280 : 88),
                    x: isMobile && !sidebarOpen ? -280 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed left-0 top-0 h-full bg-white ${isMobile ? 'z-[70]' : 'z-40'} flex flex-col border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] pt-20 overflow-hidden`}
            >
                <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <p className={`px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-200 ${!isMobile && !sidebarOpen ? 'opacity-0 hidden' : 'opacity-100 delay-100'}`}>Menu</p>
                    <NavButton id="dashboard" icon={<DashboardIcon />} label="Dashboard" />
                    <NavButton id="offers" icon={<OffersIcon />} label="Offers" />
                    <NavButton id="applications" icon={<ApplicationsIcon />} label="My Applications" />
                    <NavButton id="nomination" icon={<NominationIcon />} label="Nomination" />

                    <div className={`my-4 border-t border-gray-100 mx-2 transition-opacity duration-200 ${!isMobile && !sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></div>

                    <p className={`px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-200 ${!isMobile && !sidebarOpen ? 'opacity-0 hidden' : 'opacity-100 delay-100'}`}>Records</p>
                    <NavButton id="documents" icon={<DocumentsIcon />} label="Documents" />
                    <NavButton id="analytics" icon={<AnalyticsIcon />} label="Analytics" />
                </div>

                <div className="p-3 border-t border-gray-100 space-y-1 bg-gray-50/50">
                    <NavButton id="profile" icon={<ProfileIcon />} label="Profile" />
                    <NavButton id="settings" icon={<SettingsIcon />} label="Settings" />
                    <NavButton id="logout" icon={<LogoutIcon />} label="Logout" isLogout onClick={handleLogout} />
                </div>

                {/* Desktop Toggle Button */}
                {!isMobile && (
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="absolute -right-3 top-24 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md text-[#003366] hover:bg-[#003366] hover:text-white transition-all duration-200 z-50 transform hover:scale-110"
                    >
                        {sidebarOpen ? <ChevronLeftIcon style={{ fontSize: 16 }} /> : <ChevronRightIcon style={{ fontSize: 16 }} />}
                    </button>
                )}
            </motion.aside>
        </>
    );

    const NavButton = ({ id, icon, label, isLogout, onClick }) => {
        const isActive = activeTab === id;
        const showLabel = isMobile || sidebarOpen;

        return (
            <button
                onClick={() => {
                    if (onClick) onClick();
                    else setActiveTab(id);
                    if (isMobile) setSidebarOpen(false);
                }}
                className={`
                    relative w-full flex items-center py-3 px-3.5 rounded-xl transition-all duration-300 group overflow-hidden
                    ${isActive && !isLogout
                        ? 'bg-gradient-to-r from-[#003366] to-[#004080] text-white shadow-md shadow-blue-900/20'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-[#003366]'
                    }
                    ${isLogout ? 'hover:bg-red-50 hover:text-[#D62828] text-gray-500' : ''}
                `}
                title={!showLabel ? label : ''}
            >
                <span className={`
                    flex items-center justify-center transition-all duration-300 z-10 w-6 h-6
                    ${isActive && !isLogout ? 'text-white' : ''}
                `}>
                    {React.cloneElement(icon, {
                        fontSize: "medium",
                        className: `transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`
                    })}
                </span>

                {showLabel && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="ml-4 font-medium truncate z-10 text-sm"
                    >
                        {label}
                    </motion.span>
                )}

                {!isMobile && !sidebarOpen && isActive && (
                    <motion.div
                        layoutId="activePip"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#D62828] rounded-r-full"
                    />
                )}
            </button>
        );
    };

    const TopNavbar = () => (
        <div className="h-20 bg-white/95 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm border-b border-gray-100">
            <div className="flex items-center">
                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <MenuIcon />
                    </button>
                )}

                {/* Logo */}
                <img
                    src={logo}
                    alt="IAESTE"
                    className="h-8 md:h-12 w-auto object-contain mr-4 md:mr-6"
                />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize border-l border-gray-200 pl-4 md:pl-6 truncate max-w-[150px] md:max-w-none">
                    {activeTab}
                </h2>
            </div>
            <div className="flex items-center space-x-2 md:space-x-6">
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-[#003366]/20 transition-all w-48 lg:w-64" />
                </div>
                <div className="relative cursor-pointer">
                    <NotificationsIcon className="text-gray-600 hover:text-[#003366] transition-colors" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D62828] rounded-full ring-2 ring-white"></span>
                </div>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-800">Member Name</p>
                        <p className="text-xs text-[#003366]">LCJ-2026-045</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#003366] to-[#005a8f] flex items-center justify-center text-white font-bold text-sm md:text-base">
                        MN
                    </div>
                </div>
            </div>
        </div>
    );

    // --- Views ---

    const DashboardView = () => (
        <div className="space-y-8 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Total Offers" value="1,248" icon={<OffersIcon />} color="#003366" />
                <StatCard title="Applied" value="12" icon={<ApplicationsIcon />} color="#D62828" />
                <StatCard title="Shortlisted" value="3" icon={<CheckCircleIcon />} color="#10B981" />
                <StatCard title="Profile Status" value="85%" icon={<ProfileIcon />} color="#F59E0B" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Offers by Country</h3>
                    <div className="h-64 w-full">
                        <Bar
                            data={{
                                labels: ['Germany', 'Poland', 'Switzerland', 'India', 'USA', 'Japan'],
                                datasets: [{
                                    label: 'Offers',
                                    data: [120, 98, 86, 75, 60, 45],
                                    backgroundColor: '#003366',
                                    borderRadius: 6,
                                }]
                            }}
                            options={{ maintainAspectRatio: false, responsive: true }}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Notifications</h3>
                    <div className="space-y-4">
                        {NOTIFICATIONS.map(note => (
                            <div key={note.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-50 last:border-0">
                                <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${note.type === 'offer' ? 'bg-[#003366]' : note.type === 'alert' ? 'bg-[#D62828]' : 'bg-green-500'}`}></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{note.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-[#003366] font-semibold hover:underline">View All</button>
                </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Application Activity</h3>
                <div className="h-64 w-full">
                    <Line
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Applications Sent',
                                data: [2, 5, 8, 12, 10, 15],
                                borderColor: '#D62828',
                                tension: 0.4,
                                fill: true,
                                backgroundColor: 'rgba(214, 40, 40, 0.1)'
                            }]
                        }}
                        options={{ maintainAspectRatio: false, responsive: true }}
                    />
                </div>
            </div>
        </div>
    );

    const StatCard = ({ title, value, icon, color }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">{value}</h3>
                </div>
                <div className="p-3 rounded-xl bg-opacity-10" style={{ backgroundColor: `${color}20`, color: color }}>
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold" style={{ color: color }}>
                <span>+12%</span>
                <span className="text-gray-400 ml-1 font-normal">from last month</span>
            </div>
        </motion.div>
    );

    const OffersView = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFFERS.map(offer => (
                    <motion.div
                        key={offer.id}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group cursor-pointer"
                        onClick={() => setSelectedOffer(offer)}
                    >
                        {offer.urgent && (
                            <span className="absolute top-4 right-4 bg-[#D62828]/10 text-[#D62828] text-xs font-bold px-3 py-1 rounded-full">
                                URGENT
                            </span>
                        )}
                        <div className="flex items-center mb-4">
                            <span className="text-4xl mr-4">{offer.flag}</span>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-[#003366] transition-colors">{offer.company}</h3>
                                <p className="text-sm text-gray-500">{offer.country}</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <h4 className="font-semibold text-gray-700 min-h-[48px]">{offer.position}</h4>
                            <div className="flex items-center text-sm text-gray-600">
                                <TimeIcon className="w-4 h-4 mr-2 text-gray-400" /> {offer.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <StipendIcon className="w-4 h-4 mr-2 text-gray-400" /> {offer.stipend}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FieldIcon className="w-4 h-4 mr-2 text-gray-400" /> {offer.field}
                            </div>
                        </div>
                        <button className="w-full py-2 rounded-lg bg-[#F4F6F8] text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition-all">
                            View Details
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const OfferDetailModal = ({ offer, onClose }) => {
        const [detailTab, setDetailTab] = useState('Overview');
        if (!offer) return null;
        return (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Header */}
                    <div className="bg-[#003366] p-6 md:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-start">
                            <span className="text-5xl md:text-6xl mr-6 shadow-lg rounded-lg mb-4 md:mb-0">{offer.flag}</span>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">{offer.position}</h2>
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-blue-100 space-y-1 md:space-y-0">
                                    <span className="flex items-center"><CompanyIcon className="w-4 h-4 mr-1" /> {offer.company}</span>
                                    <span className="flex items-center"><LocationIcon className="w-4 h-4 mr-1" /> {offer.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs - Scrollable on mobile */}
                    <div className="flex border-b border-gray-200 px-4 md:px-8 bg-white sticky top-0 z-10 overflow-x-auto hide-scrollbar">
                        {['Overview', 'Description', 'Requirements', 'Benefits'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setDetailTab(tab)}
                                className={`px-4 md:px-6 py-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${detailTab === tab ? 'text-[#003366]' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                                {detailTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003366]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={detailTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {detailTab === 'Overview' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                        <div className="col-span-1 md:col-span-2 space-y-6">
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                                <h3 className="text-lg font-bold text-[#003366] mb-4">At a Glance</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="flex items-center text-gray-700">
                                                        <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#003366]"><CompanyIcon /></div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Employer</p>
                                                            <p className="font-semibold">{offer.company}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-700">
                                                        <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#003366]"><LocationIcon /></div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Location</p>
                                                            <p className="font-semibold">{offer.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-700">
                                                        <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#003366]"><TimeIcon /></div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Duration</p>
                                                            <p className="font-semibold">{offer.duration}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-700">
                                                        <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#003366]"><StipendIcon /></div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Stipend</p>
                                                            <p className="font-semibold">{offer.stipend}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Deadline</h4>
                                                <p className="text-3xl font-bold text-[#D62828] mb-2">{offer.deadline}</p>
                                                <p className="text-sm text-gray-500">Applications close automatically at midnight.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {detailTab === 'Description' && (
                                    <div className="space-y-6 max-w-3xl">
                                        <section>
                                            <h3 className="text-lg font-bold text-[#003366] mb-3">About the Role</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                As a {offer.position} at {offer.company}, you will work directly with our engineering teams to build scalable solutions. You will participate in code reviews, design discussions, and contribute to our core products.
                                            </p>
                                        </section>
                                        <section>
                                            <h3 className="text-lg font-bold text-[#003366] mb-3">Key Responsibilities</h3>
                                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                                <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                                                <li>Unit-test code for robustness, including edge cases, usability, and general reliability.</li>
                                                <li>Work on bug fixing and improving application performance.</li>
                                                <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency.</li>
                                            </ul>
                                        </section>
                                    </div>
                                )}

                                {detailTab === 'Requirements' && (
                                    <div className="space-y-6 max-w-3xl">
                                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                            <h3 className="text-lg font-bold text-[#003366] mb-3">Academic Requirements</h3>
                                            <ul className="space-y-3">
                                                <li className="flex items-start">
                                                    <CheckCircleIcon className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Currently enrolled in {offer.field} or related degree</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircleIcon className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Completed at least 4 semesters of study</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#003366] mb-3">Skills & Competencies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {['JavaScript', 'React', 'Node.js', 'Teamwork', 'English B2', 'Problem Solving'].map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {detailTab === 'Benefits' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        {['Accommodation Assitance', 'Health Insurance', 'Transportation Allowance', 'Cultural Events', 'Mentorship Program', 'Certificate of Completion'].map((benefit, i) => (
                                            <div key={i} className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
                                                    <CheckCircleIcon />
                                                </div>
                                                <span className="font-semibold text-gray-800">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                <DownloadIcon className="w-4 h-4 mr-2" /> PDF
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                <BookmarkIcon className="w-4 h-4 mr-2" /> Save
                            </button>
                        </div>
                        <button
                            onClick={() => { onClose(); alert("Application Started!"); }}
                            className="w-full md:w-auto flex items-center justify-center px-8 py-3 bg-[#D62828] text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Apply Now <SendIcon className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    };

    // --- Main Render ---

    // Calculate main margin based on sidebar state
    const mainMargin = isMobile ? 'ml-0' : (sidebarOpen ? 'ml-[280px]' : 'ml-[88px]');

    return (
        <div className="min-h-screen bg-[#F4F6F8] font-sans flex text-[#1F2937] relative"> {/* relative parent for z-indexing */}

            {/* Top Navbar - Z-Index Higher than Sidebar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <TopNavbar />
            </div>

            {/* Sidebar */}
            <Sidebar />

            <div className={`flex-1 transition-all duration-300 ease-in-out pt-20 ${mainMargin}`}>
                <main className="p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'dashboard' && <DashboardView />}
                            {activeTab === 'offers' && <OffersView />}
                            {activeTab !== 'dashboard' && activeTab !== 'offers' && (
                                <div className="flex items-center justify-center h-96 text-gray-400">
                                    <div className="text-center">
                                        <NominationIcon style={{ fontSize: 64, opacity: 0.5 }} />
                                        <p className="mt-4 text-lg">Section under development</p>
                                        <p className="text-sm">Check back soon!</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <AnimatePresence>
                {selectedOffer && (
                    <OfferDetailModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
