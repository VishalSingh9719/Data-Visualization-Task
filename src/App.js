
import './App.css';
import WineStatsTable from './component/wineDataTable';
import { wineData } from './data/wineDataSet';
function App() {
  return (
    <div className="App">
      <WineStatsTable wineData={wineData}/>
    </div>
  );
}

export default App;
