import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import './modal.scss';

const Modal = ({ showModal, setShowModal, textMessage }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth/login');
    };

    if(!showModal) return null;

    return (
        <div className='modal'>
            <div className='modal-container'>
                <AiOutlineCloseSquare className='modal-container-close' onClick={() => setShowModal(false)} />
                <p>Você precisa fazer login para { textMessage }</p>
                <button className='btn' onClick={handleLoginClick}>Conecte-se</button>
            </div>
        </div>
    );
};

export default Modal;