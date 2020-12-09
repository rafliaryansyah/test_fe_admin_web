import actionTypes from '../actionTypes';

const initialState = {
  customers: [
    {
      id: '2d3a299f-86c2-4440-9a47-eb16f443e337',
      name: 'Seller Ke Dua',
      statusUser: {
        id: 2,
        name: 'Non Active'
      },
      gender: {
        id: 2,
        name: 'Wanita'
      },
      email: 'sellerDua@example.com',
      phone: '',
      emailVerfied: true,
      emailVerfiedAt: 1607350255,
      isDeleted: true,
      isDeletedAt: 1607326628,
      createdAt: 1607177455,
      roles: ['customer', 'super-admin-merchant']
    },
    {
      id: '3a2992df-c862-4440-97a4-ee337b16f443',
      name: 'Seller',
      statusUser: {
        id: 1,
        name: 'Active'
      },
      gender: {
        id: 1,
        name: 'Pria'
      },
      email: 'seller@example.com',
      phone: '',
      emailVerfied: true,
      emailVerfiedAt: 1607177455,
      isDeleted: false,
      isDeletedAt: false,
      createdAt: 1607177455,
      roles: ['customer', 'super-admin-merchant']
    },
    {
      id: '7c206027-8fb7-4c17-98d0-733dbf4832d3',
      name: 'Customer',
      statusUser: {
        id: 1,
        name: 'Active'
      },
      gender: {
        id: 2,
        name: 'Wanita'
      },
      email: 'customer@example.com',
      phone: '',
      emailVerfied: true,
      emailVerfiedAt: 1607177455,
      isDeleted: false,
      isDeletedAt: false,
      createdAt: 1607177455,
      roles: ['customer']
    }
  ],
  customer: {
    id: '7c206027-8fb7-4c17-98d0-733dbf4832d3',
    name: 'Customer',
    statusUser: {
      id: 1,
      name: 'Active'
    },
    gender: {
      id: 2,
      name: 'Wanita'
    },
    email: 'customer@example.com',
    phone: '',
    emailVerfied: true,
    emailVerfiedAt: 1607177455,
    isDeleted: false,
    isDeletedAt: false,
    createdAt: 1607177455,
    roles: ['customer', 'super-admin-merchant']
  }
};

/**
 * @name customer
 * @description reducer untuk global app
 */
const customer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.customer.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.value
      };

    case actionTypes.customer.SET_CUSTOMER:
      return {
        ...state,
        customer: action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default customer;
