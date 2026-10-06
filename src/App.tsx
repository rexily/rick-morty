import { Route, Routes } from 'react-router'
import { CharacterList, CharacterInfo } from '@/pages'
import { Layout } from '@/shared'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position='bottom-right' />
      <Routes>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          index
          element={<CharacterList />}
        />

        <Route
          path='/character/:id'
          element={<CharacterInfo />}
        />
      </Route>
    </Routes>
</>
  )
}

export default App
