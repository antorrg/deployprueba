import {useEffect, useState}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers}from '../../../../redux/actions'
import GenericButton from '../../../GenericButton/GenericButton'
import showConfirmationDialog from '../../../utils/sweetAlert'
import sendChanges from './SendChanges'
import styles from '../../generalStyles/ModalsForms/Forms.module.css'

const ChangeUser = ({carEdit, onClose}) => {
    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const users = useSelector((state)=>state.allUsers)
    useEffect(()=>{
        dispatch(getAllUsers())
    },[])

     const handleSubmit = async(e) => {
        e.preventDefault();
        
        const confirmed = await showConfirmationDialog('¿Está seguro de actualizar el vehiculo?');
    if (confirmed) {
        // Llamar a la función sendChanges con el nuevo propietario seleccionado
        sendChanges(carEdit, selectedUserId, onClose);
        
    }
    };

    const handleSelectChange = (e) => {
        setSelectedUserId(e.target.value);
    };

//<<<<<<<<<<<< searchbar >>>>>>>>>>>>>>>>>


const handleSearch = () => {
    if (searchTerm.trim() !== '') {
        const userFound = users.find((user) => user.numberId === searchTerm);
        if (userFound) {
            setSelectedUserId(userFound.id);
        }
    } else {
        setSelectedUserId(null); 
    // Reiniciar el usuario seleccionado si el campo de búsqueda está vacío
    }
};
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
//<<<<<<<<inhabilitar el boton submit si no hay nada seleccionado>>>>>>>>>>>>>>>>>

 const permit = (!selectedUserId)? true :false
 

  return (
    <div className={styles.formContainer}>
        <h3>Seleccione un propietario: </h3>
        <div>
      <input
        type="search"
        placeholder={'Documento Nº...'}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyPress}
        className=''
      />
      <GenericButton onClick={handleSearch} buttonText={'Buscar'}/>
    </div>
    <br></br>
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

