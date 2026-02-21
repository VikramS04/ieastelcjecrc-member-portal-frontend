import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../../utils/api';

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!currentPassword) {
            setError('Please enter your current password.');
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            setError('New password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }
        try {
            setLoading(true);
            await apiFetch('/api/me/password', {
                method: 'PATCH',
                body: { currentPassword, newPassword },
            });
            setMessage('Password updated successfully.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Settings</h3>
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Change Password</h4>
                    <p className="text-sm text-gray-500 mb-4">Enter your current password to set a new one.</p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20"
                                placeholder="Current password"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20"
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D59]/20"
                                placeholder="Repeat new password"
                            />
                        </div>
                        <div className="md:col-span-3 flex items-center justify-between flex-wrap gap-4">
                            <p className="text-[11px] text-gray-500">You must enter your current password to change it.</p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2 rounded-lg bg-[#0B3D59] text-white text-xs font-semibold hover:bg-[#09314a] disabled:opacity-60"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                    {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                    {message && <p className="mt-2 text-xs text-green-600">{message}</p>}
                </div>
            </div>
        </motion.div>
    );
}
