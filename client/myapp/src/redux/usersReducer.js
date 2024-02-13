const initialState = {
    users: [],
    isEdit: false,
    isAddUser: false,
    isUpdated: false,
    isAdded: false,
    userPermissions : [],
    expiresIn: ''
}

const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'LOAD_EXPIRESIN':
            return {...state, expiresIn : payload}
            
        case 'LOAD':
            return { ...state, users: payload }

        case 'LOAD_PERMISSIONS':
            return {...state, userPermissions: payload}

        case 'ADDUSER':
            return { ...state, users: [...state.users, payload], isAdded: true }

        case 'CHANGEISEDIT':
            return { ...state, isEdit: payload }

        case 'CHANGEISADDUSER':
            return { ...state, isAddUser: payload }

        case 'CHANGE_ISADDED':
            return { ...state, isAdded: payload }

        case 'CHANGE_ISUPDATED':
            return { ...state, isUpdated: payload }

        case 'UPDATE_USER':
            let users = [...state.users]
            let index = users.findIndex(x => x.id === payload.id)
            if (index >= 0) {
                users[index] = payload
            }
            return { ...state, users, isUpdated: true }

        case 'DELETEUSER':
            let users2 = [...state.users]
            let index2 = users2.findIndex(x => x.id === payload)
            if (index2 >= 0) {
                users2.splice(index2, 1)
            }
            return { ...state, users: users2 }

        default:
            return state
    }
}

export default usersReducer
