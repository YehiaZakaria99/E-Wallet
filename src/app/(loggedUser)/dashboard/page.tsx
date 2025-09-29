import React from 'react'

import { loggedUser } from '../../_AppComponents/Guard/loggedUser';
import { redirect } from 'next/navigation';
import Dashboard from '@/app/_AppComponents/Dashboard/Dashboard';

export default async function DashboardPage() {
    const isLoggedUser = await loggedUser();
    if (!isLoggedUser) {
        redirect("/");
    }
    return (
        <>
            <Dashboard />

        </>
    )
}
