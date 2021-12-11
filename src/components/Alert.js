import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DescriptionAlert(props) {
    const { setOpen, open }=props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        props.alert && <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.alert.type} sx={{ width: '100%' }}>
                    {props.alert.msg}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
