import React from 'react'
import PermanentDrawerLeft from './Drawer';
import { Notes } from './Notes';

const Home = (props) => {
    const { showAlert, setOpen } = props;
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <PermanentDrawerLeft showAlert={showAlert} setOpen={setOpen} />
                <Notes showAlert={showAlert} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Home
