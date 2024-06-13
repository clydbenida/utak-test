import './App.css'
import { useState } from 'react'
import { Fab, Snackbar } from '@mui/material'
import { Add } from '@mui/icons-material'

import Header from './components/Header'
import MainContent from './components/MainContent'
import CreateMenuDialog from './components/CreateMenuDialog'
import { useAppSelector } from './redux/hooks'
import useFetchMenu from './hooks/useFetchMenu'
import SkeletonLayout from './components/SkeletonLayout'
import useSnackbar from './hooks/useSnackbar'

function App() {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const query = useAppSelector(state => state.app.search.query);
  const isLoading = useAppSelector(state => state.app.loading);

  const { open, message, handleClose } = useSnackbar();
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
      {isLoading ? (
        <SkeletonLayout />
      ) : (
        <MainContent handleOpenEditMenu={handleOpenCreateMenuDialog} />
      )}
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

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
      />
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
