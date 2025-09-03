import './style/App.css';
import worker from './worker';
import WebWorker from './WebWorker'
import { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [number, setNumber] = useState("")
  const [userList, setUserList] = useState([
    'user1', 'user2', 'user3', 'user4', 'user5', 'user6',
    'user7', 'user8', 'user9', 'user10', 'user11', 'user12',
    'user13', 'user14', 'user15', 'user16', 'user17', 'user18',
    'user19', 'user20', 'user21', 'user22', 'user23', 'user24',
    'user25', 'user26', 'user27', 'user28', 'user29', 'user30',
  ]);

  const handleClick = useCallback((index) => {
    const updatedList = [...userList];
    updatedList[index] = 'roshaan'; // Change clicked item
    setUserList(updatedList);
  }, []);

  const webWorker = new WebWorker(worker)

  const onTaskStart = () => {
    if (number) {
      setIsLoading(true)
      setResult(null)
      webWorker.postMessage({ count: number })
      webWorker.addEventListener("message", (e) => {
        const { data } = e;
        console.log(data, "message")
        setIsLoading(false)
        setResult(data)
      })
    }else{
      alert("Kindly enter number to run loop")
    }
  }

  return (
    <div className="container">
      <h1 className='heading'>Web Worker</h1>
      <p className='text'>
        A Web Worker is a JavaScript script that runs in the background, separate from the main execution thread of the browser. It's used to perform intensive or long-running tasks without blocking the user interface, thus preventing the page from becoming unresponsive.
      </p>
      <div className="inputContainer">
        <input value={number} onChange={e => setNumber(e.target.value)} className='inputBox' />
      </div>
      <div className='btn-container'>
        <button className='btn' onClick={onTaskStart} disabled={isLoading}>
          {!isLoading ?
            <p className='text'>Start Intensive Task</p>
            : <Loader />
          }
        </button>
        <button className='btn' onClick={() => console.log("222")}>
          <p className='text'>Perform some action</p>
        </button>
      </div>
      <div className='content'>
        {isLoading &&
          <p>Heavy Processing ...</p>
        }
        {result && (
          <div className="resultContainer">
            <h2 className="sub-heading">Processing Complete!</h2>
            <p className="text">
              Successfully processed {number} items, each involving 100,000 calculations
              (Its running 100,000 squre roots per item)</p>
            <p className="text">Successfully processed {result.length} items.</p>
            <p className="text">
              Example item: `id: {result[0].id}, processedValue: {result[0].processedValue}`
            </p>
          </div>
        )}
        <div className='userListContainer'>
          {userList &&
            userList.map((item, i) => {
              return (
                <p key={i} onClick={() => handleClick(i)} className='text userItem'>{item}</p>
              )
            })
          }
        </div>
      </div>
    </div>

  );
}

export default App;
