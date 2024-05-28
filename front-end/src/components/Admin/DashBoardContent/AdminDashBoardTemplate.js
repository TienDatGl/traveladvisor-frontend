import classNames from 'classnames'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoTriangleUp } from 'react-icons/go';
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'
import { useSelector } from 'react-redux'

import WidgetsBrand from '../DashBoardContent/Widgets/WidgetsBrand'
import WidgetsDropdown from '../DashBoardContent/Widgets/WidgetsDropdown'
import MainChart from './MainChart'

import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Link } from 'react-router-dom'
import { getOrderStatus } from './helpers/adminHelpers.jsx'
import { useMemo } from 'react'
const AdminDashBoardTemplate = () => {
    const [usersData, setUsersData] = useState([])
    const [commentsData, setCommentsData] = useState([])
    const [tripsData, setTripsData] = useState([])
    const locationData = useSelector(state => state.location.locationList)
    console.log("Location Data la: ", locationData)
    console.log("Users Data la: ", usersData)
    console.log("Comments Data la: ", commentsData)
    console.log("Trips Data la: ", tripsData)

    function filterLocationsWithNull(data) {
        return data.filter(location => location.positive !== null && location.negative !== null);
    }

    const filteredData = filterLocationsWithNull(locationData);
    console.log(filteredData);

    // DÙNG CHO BIỂU ĐỒ HÌNH TRÒN
    const totalPositive = locationData.reduce((total, location) => total + location.positive, 0);
    const totalNegative = locationData.reduce((total, location) => total + location.negative, 0);
    const totalNeutral = locationData.reduce((total, location) => total + location.neutral, 0);
    console.log("Tong Positive la: ", totalPositive)
    console.log("Tong Negative la: ", totalNegative)
    console.log("Tong Neutrural la: ", totalNeutral)

    // PIE CHART DATA BIỂU ĐỒ HÌNH TRÒN
    const dataPie = [
        { name: 'Positve', value: totalPositive },
        { name: 'Negative', value: totalNegative },
        { name: 'Same', value: totalNeutral }
    ]

    const RADIAN = Math.PI / 180
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }
    console.log("TRIP DATA RESULT", tripsData.results)

    function countTripsByUser(trips) {
        const tripCount = {};
        trips.forEach(trip => {
            if (trip.user in tripCount) {
                tripCount[trip.user]++;
            } else {
                tripCount[trip.user] = 1;
            }
        });

        return tripCount;
    }

    const tripCountByUser = tripsData.results && countTripsByUser(tripsData.results);

    console.log(tripCountByUser)

    useEffect(() => {
        try {
            const token = localStorage.getItem("accessToken");
            const getUsers = async () => {
                const response = await axios.get(`https://admin.traveladvisor.io.vn/backend/users/`, {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                })
                const responseComemnts = await axios.get(`https://admin.traveladvisor.io.vn/backend/comment/`, {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                })
                const responseTrips = await axios.get(`https://admin.traveladvisor.io.vn/backend/trips/`, {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                })
                const dataRes = response.data
                const dataComments = responseComemnts.data
                const dataTrips = responseTrips.data
                if (Array.isArray(dataRes.results) && Array.isArray(dataComments.results) && Array.isArray(dataTrips.results)) {
                    const filterSuperAdmin = dataRes.results.filter(user => { return user.is_superuser != true })
                    setUsersData(filterSuperAdmin);
                    setCommentsData(dataComments)
                    setTripsData(dataTrips)
                } else {
                    console.error("Data is not an array:", dataRes);
                }
            }
            getUsers()
        }
        catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <>
            <div className="grid gap-4 p-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                        <IoBagHandle className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Users</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">{usersData.length * 10}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                        <IoPieChart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Locations</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng location*/}
                            <strong className="text-xl text-gray-700 font-semibold">{locationData.length + 10}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                        <IoPeople className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Comments</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">{commentsData.count}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                        <IoCart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Trips</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">{tripsData.count}</strong>
                        </div>
                    </div>
                </BoxWrapper>
            </div>


            {/* TRANSACTIONS */}
            <div className="h-[24rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mr-4 ml-4">
                <strong className="text-gray-700 font-medium">Analyze results</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={filteredData}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="positive" fill="#0ea5e9" />
                            <Bar dataKey="negative" fill="#ea580c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='grid gap-4 p-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                {/* PIE CHART COMMENTS*/}
                <div className="col-span-1 h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
                    <strong className="text-gray-700 font-medium">Location evaluation pie chart</strong>
                    <div className="mt-3 w-full flex-1 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={dataPie}
                                    cx="50%"
                                    cy="45%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={105}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {dataPie.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* POPULAR PRODUCTS */}
                <div className="col-span-1 h-[22rem]  bg-white p-4 rounded-sm border border-gray-200 overflow-auto">
                    <strong className="text-gray-700 font-medium">Popular Destinations</strong>
                    <div className="mt-4 flex flex-col gap-3">
                        {locationData.map((location) => (
                            <Link
                                key={location.id}
                                to={'#'}
                                className="flex items-start hover:no-underline"
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] rounded-sm">
                                    <img
                                        className="w-full h-full object-cover rounded-sm"
                                        src="https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png"
                                        alt={location.name}
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-800">{location.name}</p>
                                    <span
                                        className={classNames(
                                            location.subcategory <= 2
                                                ? 'text-red-500'
                                                : location.subcategory > 4
                                                    ? 'text-green-500'
                                                    : 'text-orange-500',
                                            'text-xs font-medium'
                                        )}
                                    >
                                        {location.subcategory > 4 ? 'High rating' : 'Low rating'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 pl-1.5">{location.address}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT TRIP CREATED */}
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-700 flex-1 ml-4 mr-4">
                <strong className="text-gray-700 font-medium">Recent Trip created</strong>
                <div className="border-gray-200 rounded-sm mt-3">
                    <table className="w-full text-gray-700 ">
                        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 px-4">
                            <tr>
                                <th class="px-6 py-3">ID</th>
                                <th class="px-6 py-3">First name</th>
                                <th class="px-6 py-3">Last name</th>
                                <th class="px-6 py-3">Email</th>
                                <th class="px-6 py-3">User name</th>
                                <th class="px-6 py-3">Current user trips</th>
                            </tr>
                        </thead>
                        <tbody className='mt-3'>
                            {usersData.map((user, index) => {
                                return (
                                    <>
                                        <tr className="odd:bg-white even:bg-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {user.id}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {user.email}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.first_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.last_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#"
                                                    className={classNames(
                                                        tripCountByUser[user.id] > 0
                                                            ? 'text-xl font-medium'
                                                            : tripCountByUser[user.id] === 0
                                                                ? 'opacity-75'
                                                                : 'text-orange-500',
                                                        'text-md font-medium px-6 py-4'
                                                    )}>
                                                    {tripCountByUser[user.id] > 0 ? `${tripCountByUser[user.id]} trips` : 'None'}
                                                </a>
                                            </td>
                                        </tr>
                                    </>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );




}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default AdminDashBoardTemplate