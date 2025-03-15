import { Modal, Box, Typography, Button, Stack, TextField } from '@mui/material';
import '../assets/css/TransactionModal.css'

// Estilo para el contenido del modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalConfirmationInterface {
    open: boolean;
    onClose: () => void;
    data?: any;
    onConfirmation: (data?: any) => void;
}

const ModalConfirmation = ({ open, onClose, data, onConfirmation }: ModalConfirmationInterface) => {

    const handleConfirmation = () => {
        onConfirmation(data?.fund);
    }
    
  return (
    <>
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        >
        <Box sx={modalStyle}>
            <div style={{ marginBottom: 15 }}>
                <Typography id="modal-title" variant="h6" component="h2" className="title">
                    Retiro del fondo
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }} className='description'>
                    ¿Realmente desea retirarse del fondo?
                </Typography>
            </div>
            <Stack direction="row" spacing={2} justifyContent='flex-end'>
                <Button onClick={onClose} color='error' variant="outlined" sx={{ mt: 2 }}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirmation} variant='contained' color='success' sx={{ mt: 2 }}>
                    Confirmar
                </Button>
            </Stack>
        </Box>
        </Modal>
    </>
  );
};

export default ModalConfirmation;