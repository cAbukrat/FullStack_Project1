const initialState = {
    members: [],
    isEditMember: false,
    isAddMember: false,
    isUpdated: false,
    isAdded: false,
    memberData: {},
    cardMemberData: {}
}

const subscriptionsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'LOAD_MEMBERS':
            return { ...state, members: payload }

        case 'CHANGE_ISADD':
            return { ...state, isAddMember: payload }

        case 'CHANGE_ISEDIT':
            return { ...state, isEditMember: payload }

        case 'LOAD_MEMBER_DATA':
            return { ...state, memberData: payload }

        case 'LOAD_CARD_MEMBER_DATA':
            const cardMemberData = state.cardMemberData
            cardMemberData.subscription = [payload]
            return { ...state, cardMemberData }

        case 'DELETE_MEMBER':
            const members = [...state.members]
            const index = members.findIndex(x => x.memberData._id === payload)
            if (index >= 0) {
                members.splice(index, 1)
            }
            return { ...state, members, memberData: {} }


        case 'ADD_MEMBER':
            const member = { memberData: payload.obj, subscription: [], unwatchedMovies: payload.unwatchedMovies }
            return { ...state, members: [...state.members, member], isAdded: true }


        case 'CHANGE_IS_ADDED':
            return { ...state, isAdded: payload }

        case 'CHANGE_IS_UPDATED':
            return { ...state, isUpdated: payload }

        case 'UPDATE_MEMBER':
            let members1 = [...state.members]
            let index1 = members1.findIndex(x => x.memberData._id === payload.id)
            if (index1 >= 0) {
                members1[index1].memberData = payload.member
            }
            return { ...state, members: members1, isUpdated: true, memberData: {} }


        default:
            return state
    }
}

export default subscriptionsReducer
