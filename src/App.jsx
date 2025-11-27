import './App.css'
import VirtualizedList from './components/VirtualizedList/VirtualizedList'

// Input Dummy Data
const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

function App() {
  return (
    <VirtualizedList list={LIST} height={600} width={400} itemHeight={50} />
  )
}

export default App
