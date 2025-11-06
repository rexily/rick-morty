import { Route, Routes } from 'react-router'
import { Layout } from '@/shared/Layout/Layout.tsx'
import { CharacterList, CharacterInfo } from '@/pages'

function App() {
  return (
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
  )
}

export default App
