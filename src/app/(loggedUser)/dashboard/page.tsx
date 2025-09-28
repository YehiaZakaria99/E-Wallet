import React from 'react'
import Dashboard from '../../_AppComponents/Dashboard/Dashboard'
import { loggedUser } from '../../_AppComponents/Guard/loggedUser';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    // const isLoggedUser = await loggedUser();
    // if (!isLoggedUser) {
    //     redirect("/");
    // }
    return (
        <>
            <Dashboard />
        </>
    )
}
