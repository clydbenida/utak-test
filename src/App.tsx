import { Fab } from '@mui/material'
import './App.css'
import Header from './components/Header'
import { Add } from '@mui/icons-material'
import MainContent from './components/MainContent'
import CreateMenuDialog from './components/CreateMenuDialog'
import { useState } from 'react'

function App() {
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  function handleOpenCreateMenuDialog() {
    setShowCreateMenu(true);
  }

  function handleCloseCreateMenuDialog() {
    setShowCreateMenu(false);
  }


  return (
    <>
      <Header />
      <MainContent />
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
