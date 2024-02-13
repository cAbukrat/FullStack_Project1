import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useOutletContext, useNavigate } from 'react-router-dom'
import MemberCard from '../components/MemberCard';
import AlertComp from '../components/AlertComp';

const AllMembers = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const membersData = useSelector(state => state.subscriptions.members)
    const isUpdated = useSelector(state => state.subscriptions.isUpdated)
    const isAdded = useSelector(state => state.subscriptions.isAdded)
    const { member } = useOutletContext();
    const [deleted, setdeleted] = useState(false)

    const deletedMemberOrGoToEdit = useCallback((member) => {
        if (member) {
            dispatch({ type: "CHANGE_ISEDIT", payload: true })
            dispatch({ type: 'LOAD_MEMBER_DATA', payload: member })
            navigate('/home/subscriptions/edit')
        }
        else {
            setdeleted(true)
        }
    })

    return (
        <div>
            {deleted && <AlertComp type='deleted' />}
            {isUpdated && <AlertComp type='updated' comp = 'member'/>}
            {isAdded && <AlertComp type='addad' comp = 'member'/>}


            {Object.keys(member).length === 0 &&
               membersData.map((member, index) => {
                return (
                    <MemberCard key={index} member={member} callback={deletedMemberOrGoToEdit} />
                )
            })
            }
            {
                Object.keys(member).length !== 0 && <MemberCard member={member} callback={deletedMemberOrGoToEdit} />
            }
            <div style={{height:40}}></div>

        </div>
    )
}

export default React.memo(AllMembers) 