import { Route, Routes } from 'react-router'
import { CharacterList, CharacterInfo } from '@/pages'
import { Layout } from '@/shared'
import { CharacterList2 } from '@/pages/CharacterList/CharacterList2'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          index
          element={<CharacterList2 />}
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
