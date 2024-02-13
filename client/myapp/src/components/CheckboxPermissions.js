import React,{useState, useEffect} from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';

const CheckboxPermissions = ({userPermissions, callback}) => {

const [permissions, setpermissions] = useState([])

const [isChecked1, setIsChecked1] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);
const [isChecked3, setIsChecked3] = useState(false);
const [isChecked4, setIsChecked4] = useState(false);
const [isChecked5, setIsChecked5] = useState(false);
const [isChecked6, setIsChecked6] = useState(false);
const [isChecked7, setIsChecked7] = useState(false);
const [isChecked8, setIsChecked8] = useState(false);

useEffect(() => {
    if (userPermissions?.length > 0) {
        setpermissions(userPermissions)
        userPermissions.forEach(p => {
            p == "View Subscriptions" ? setIsChecked1(true) : p == 'Create Subscriptions'? setIsChecked2(true) :
            p == 'Delete Subscriptions'? setIsChecked3(true) : p == 'Update Subscriptions'? setIsChecked4(true) :
            p == 'View Movies'? setIsChecked5(true) : p == 'Create Movies'? setIsChecked6(true) :
            p == 'Delete Movies'? setIsChecked7(true) : setIsChecked8(true)
        });
    }

}, []);
useEffect(() => {
    callback(permissions)
}, [permissions]);

const handleChange = (e) => {
    if(e.target.checked){
        if(e.target.id == '2' || e.target.id == '3' || e.target.id == '4'){
            setIsChecked1(true)
            e.target.id == 2? setIsChecked2(true):  e.target.id == 3? setIsChecked3(true): setIsChecked4(true)
            let find = permissions.filter(p => p == 'View Subscriptions')
            if(find.length>0){
                setpermissions([...permissions, e.target.name])
            }
            else{
                setpermissions([...permissions, 'View Subscriptions', e.target.name])
            }
            
        }
        else if(e.target.id == '1'){
            setIsChecked1(true)
            setpermissions([...permissions, e.target.name])
        }


        if(e.target.id == '6' || e.target.id == '7' || e.target.id == '8'){
            setIsChecked5(true)
            e.target.id == 6? setIsChecked6(true):  e.target.id == 7? setIsChecked7(true): setIsChecked8(true)
            let find = permissions.filter(p => p == 'View Movies')
            if(find.length>0){
                setpermissions([...permissions, e.target.name])
            }
            else{
                setpermissions([...permissions, 'View Movies', e.target.name])
            }
        }
        else if(e.target.id == '5'){
            setIsChecked5(true)
            setpermissions([...permissions, e.target.name])
        }
    }

    else{
        e.target.id == '1' ? setIsChecked1(false) : e.target.id == '2'? setIsChecked2(false) :
        e.target.id == '3' ? setIsChecked3(false) : e.target.id == '4'? setIsChecked4(false) :
        e.target.id == '5' ? setIsChecked5(false) : e.target.id == '6' ? setIsChecked6(false) :
        e.target.id == '7' ? setIsChecked7(false) : setIsChecked8(false)

        setpermissions(permissions.filter(p => p !== e.target.name))
    }
}

    return (
        <div>
            <FormControl sx={{ textAlign: 'left' }} component="fieldset" variant="standard" color ="secondary">
                <FormLabel component="legend" >Permissions :</FormLabel>
                <FormGroup >
                    <FormControlLabel control={<Checkbox checked={isChecked1} onChange={handleChange} color="secondary" name='View Subscriptions' id='1'/>} label="View Subscriptions"  />
                    <FormControlLabel control={<Checkbox checked={isChecked2} onChange={handleChange} color="secondary" name='Create Subscriptions'  id='2'/>} label="Create Subscriptions" />
                    <FormControlLabel control={<Checkbox checked={isChecked3} onChange={handleChange} color="secondary" name='Delete Subscriptions'  id='3'/>} label="Delete Subscriptions" />
                    <FormControlLabel control={<Checkbox checked={isChecked4} onChange={handleChange} color="secondary" name='Update Subscriptions'  id='4'/>} label="Update Subscriptions" />
                    <FormControlLabel control={<Checkbox checked={isChecked5} onChange={handleChange} color="secondary" name='View Movies' id='5'/>} label="View Movies"  />
                    <FormControlLabel control={<Checkbox checked={isChecked6} onChange={handleChange} color="secondary" name='Create Movies' id='6'/>} label="Create Movies"  />
                    <FormControlLabel control={<Checkbox checked={isChecked7} onChange={handleChange} color="secondary" name='Delete Movies' id='7'/>} label="Delete Movies"  />
                    <FormControlLabel control={<Checkbox checked={isChecked8} onChange={handleChange} color="secondary" name='Update Movies' id='8'/>} label="Update Movies"  />
                </FormGroup>
            </FormControl>
            
        </div>
    )
}

export default CheckboxPermissions