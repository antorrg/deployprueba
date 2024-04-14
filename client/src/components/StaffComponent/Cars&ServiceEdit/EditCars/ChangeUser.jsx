import {useEffect, useState}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers}from '../../../../redux/actions'
import GenericButton from '../../../GenericButton/GenericButton'
import showConfirmationDialog from '../../../utils/sweetAlert'
import sendChanges from './SendChanges'
import styles from './styles/Form.module.css'

const ChangeUser = ({carEdit, onClose}) => {
    //console.log('soy el id del form: ', carEdit)
    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState(null);

    const users = useSelector((state)=>state.allUsers)
    useEffect(()=>{
        dispatch(getAllUsers())
    },[])

     const handleSubmit = async(e) => {
        e.preventDefault();
        
        const confirmed = await showConfirmationDialog('¿Está seguro de actualizar el vehiculo?');
    if (confirmed) {
        // Llamar a la función userChange con el nuevo propietario seleccionado
        sendChanges(carEdit, selectedUserId, onClose);
        
    }
    };

    const handleSelectChange = (e) => {
        setSelectedUserId(e.target.value);
    };

 const permit = (!selectedUserId)? true :false
 

  return (
    <div className={styles.formContainer}>
        <h3>Seleccione un propietario: </h3>
    <form onSubmit = {handleSubmit}>
    <select value={selectedUserId} onChange={handleSelectChange}>
                    <option value="">Seleccione un propietario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.typeId + ':' + user.numberId}
                        </option>
                    ))}
                </select>
    <GenericButton type='submit' buttonText={'Cambiar propietario'} disabled= {permit}/>
    </form>

   </div>
  )
}

export default ChangeUser

