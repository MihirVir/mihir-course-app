import React from 'react'
import NavDash from './NavDash/NavDash'
import MainHeader from './MainHeader/MainHeader'
import Test from './Test/Test'
import './dashboard.css'
const Dashboard = () => {
    const id = document.URL.split("/")[4]; 

    return (
        <>
            <NavDash />
            <MainHeader title = {id} />
            {(() => {
                switch(id) {
                    case "statistics":
                        return <Test />
                    case "users":
                        return <Test />
                    default: <MainHeader />
                }
            })()}
        </>
    )
}

export default Dashboard