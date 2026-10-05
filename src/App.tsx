import { Route, Routes } from 'react-router'
import { CharacterList, CharacterInfo } from '@/pages'
import { Layout } from '@/shared'

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
