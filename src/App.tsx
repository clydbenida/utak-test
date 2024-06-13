import './App.css'
import { useState } from 'react'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

import Header from './components/Header'
import MainContent from './components/MainContent'
import CreateMenuDialog from './components/CreateMenuDialog'
import { useAppSelector } from './redux/hooks'
import useFetchMenu from './hooks/useFetchMenu'

function App() {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const query = useAppSelector(state => state.app.search.query);

  useFetchMenu(query);

  function handleOpenCreateMenuDialog() {
    setShowCreateMenu(true);
  }

  function handleCloseCreateMenuDialog() {
    setShowCreateMenu(false);
  }

  return (
    <>
      <Header />
      <MainContent handleOpenEditMenu={handleOpenCreateMenuDialog} />
      <Fab
        onClick={handleOpenCreateMenuDialog}
        sx={fabStyles}
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

const fabStyles = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
} as const;
