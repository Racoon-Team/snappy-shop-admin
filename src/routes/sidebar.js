import { FiGrid, FiUsers, FiUser, FiCompass, FiSettings, FiSlack, FiGlobe, FiTarget } from 'react-icons/fi'

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: '/dashboard', // the url
    icon: FiGrid, // icon
    name: 'sideBar.dashboard', // name that appear in Sidebar
  },

  {
    icon: FiSlack,
    name: 'sideBar.catalog.catalogTitle',
    routes: [
      {
        path: '/products',
        name: 'sideBar.catalog.products',
      },
      {
        path: '/categories',
        name: 'sideBar.catalog.categories',
      },
      {
        path: '/attributes',
        name: 'sideBar.catalog.attributes',
      },
      {
        path: '/coupons',
        name: 'sideBar.catalog.coupons',
      },
    ],
  },

  {
    path: '/customers',
    icon: FiUsers,
    name: 'sideBar.customers',
  },
  {
    path: '/orders',
    icon: FiCompass,
    name: 'sideBar.orders',
  },

  {
    path: '/our-staff',
    icon: FiUser,
    name: 'sideBar.ourStaff',
  },

  {
    icon: FiSettings,
    name: 'sideBar.settings',
    routes: [
      {
        path: '/settings?settingTab=common-settings',
        name: 'General',
      },
      {
        path: '/settings/roles',
        name: 'roleScreen.sidebarLabel',
      },
    ],
  },

  {
    icon: FiGlobe,
    name: 'sideBar.international.internationalTitle',
    routes: [
      {
        path: '/languages',
        name: 'sideBar.international.languages',
      },
      {
        path: '/currencies',
        name: 'sideBar.international.currencies',
      },
    ],
  },
  {
    icon: FiTarget,
    name: 'sideBar.onlineStore.onlineStoreTitle',
    routes: [
      {
        name: 'sideBar.onlineStore.viewStore',
        path: '/store',
        outside: 'store',
      },

      {
        path: '/store/customization',
        name: 'sideBar.onlineStore.storeCustomizationPageTitle',
      },
      {
        path: '/store/store-settings',
        name: 'sideBar.onlineStore.storeSettings',
      },
      {
        path: '/store/delivery-points',
        name: 'sideBar.onlineStore.deliveryPoints',
      },
    ],
  },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
]

export default sidebar
