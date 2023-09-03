import { useState } from 'react'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  open?: boolean;
  onClose?: () => void;
}

const Update = ({ open = false, onClose }: Props) => {
  const [opened, setOpened] = useState(open);


  const handleClose = () => {
    setOpened(false);
    if (onClose) onClose();
  }

  return (
    <Modal
      open={opened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}

export default Update
