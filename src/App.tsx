import { Fab } from '@mui/material'
import './App.css'
import Header from './components/Header'
import { Add } from '@mui/icons-material'
import MainContent from './components/MainContent'
import CreateMenuDialog from './components/CreateMenuDialog'
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { ref, onValue } from 'firebase/database'
import { MenuItem } from './types/types'
import { useAppDispatch } from './redux/hooks'
import { assignMenuItems } from './redux/menu/menuReducer'

function App() {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const dispatch = useAppDispatch();

  function handleOpenCreateMenuDialog() {
    setShowCreateMenu(true);
  }

  function handleCloseCreateMenuDialog() {
    setShowCreateMenu(false);
  }

  useEffect(() => {
    const testRef = ref(db, 'menuItems');

    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      const dataKeys = Object.keys(data);
      const menuItems: MenuItem[] = dataKeys.map(uidKey => data[uidKey]);

      dispatch(assignMenuItems(menuItems));
    })
  }, []);

  return (
    <>
      <Header />
      <MainContent handleOpenEditMenu={handleOpenCreateMenuDialog} />
      <Fab
        onClick={handleOpenCreateMenuDialog}
        sx={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
        }}
        variant="extended"
        size="large"
        color="primary"
        aria-label='add'
      >
        <Add />
      </Fab>

      <CreateMenuDialog open={showCreateMenu} handleClose={handleCloseCreateMenuDialog} />
    </>
  )
}

export default App
