import React from 'react';
import { motion } from 'framer-motion';
import { Assignment as ApplicationsIcon } from '@mui/icons-material';

export default function Applications() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-96 text-gray-400"
        >
            <div className="text-center">
                <ApplicationsIcon style={{ fontSize: 64, opacity: 0.5 }} />
                <p className="mt-4 text-lg">Offer applications section</p>
                <p className="text-sm">Membership approvals are available under Approve Members.</p>
            </div>
        </motion.div>
    );
}
