import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


const AlertComp = ({ type, comp }) => {

    const dispatch = useDispatch()

    const [open, setopen] = useState(false)
    const [massage, setmassage] = useState('')

    useEffect(() => {
        if (type === 'deleted') {
            setmassage('Deleted successfully!')
        }
        else if (type === 'updated') {
            setmassage('Updated successfully!')
        }
        else if (type == 'addad') {
            setmassage('Created successfully!')

        }
        setopen(true)
    }, []);

    const closeAlert = () => {
        setopen(false);
        setmassage('')

        if (type == 'updated') {
            if (comp == 'member') {
                dispatch({ type: 'CHANGE_IS_UPDATED', payload: false })
            }
            else if (comp == 'users') {
                dispatch({ type: 'CHANGE_ISUPDATED', payload: false })
            }
            else {
                dispatch({ type: 'CHANGEISUPDATED', payload: false })
            }
        }

        else if (type == 'addad') {
            if (comp == 'member') {
                dispatch({ type: 'CHANGE_IS_ADDED', payload: false })
            }
            else if (comp == 'users') {
                dispatch({ type: 'CHANGE_ISADDED', payload: false })
            }
            else {
                dispatch({ type: 'CHANGEISADDED', payload: false })
            }

        }
    }

    return (
        <div>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={closeAlert}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mx: 20, mt: 5, border: 'dotted 1px gray'}}
                >
                    {massage}

                </Alert>
            </Collapse>
        </div>
    )
}

export default AlertComp