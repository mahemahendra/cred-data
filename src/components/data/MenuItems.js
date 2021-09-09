import BarcodeIcon from '../../../assets/menu/barcode.png';
import UsersIcon from '../../../assets/menu/users.png';
import AllReports from '../../../assets/menu/allreports.png';
import Profile from '../../../assets/menu/profile.png';
import ReportsIcon from '../../../assets/menu/reports.jpg';

export const MenuItems = [
    {
        name: 'Create Barcode',
        component: 'Barcode',
        icon: BarcodeIcon
    },
    {
        name: 'My Reports',
        component: 'MyReports',
        icon: ReportsIcon,
    },
    {
        name: 'Users',
        role: 'ADMIN',
        component: 'UserWrapper',
        icon: UsersIcon,
    },
    {
        name: 'Reports By User',
        role: 'ADMIN',
        component: 'Reports',
        icon: AllReports,
    },
    // {
    //     name: 'Profile',
    //     component: 'Profile',
    //     icon: Profile,
    // },
];