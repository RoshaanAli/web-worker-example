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
  const [isWithWebWorker, setIsWithWebWorker] = useState(false)

  const handleClick = useCallback((index) => {
    const updatedList = [...userList];
    updatedList[index] = 'ROSHAAN'; // Change clicked item
    setUserList(updatedList);
  }, []);

  const webWorker = new WebWorker(worker)

  const onTaskStart = () => {
    if (number && /^[0-9]+$/.test(number)) {
      setIsWithWebWorker(true)
      setIsLoading(true)
      setResult(null)
      webWorker.postMessage({ count: number })
      webWorker.addEventListener("message", (e) => {
        const { data } = e;
        console.log(data, "message")
        setIsLoading(false)
        setResult(data)
      })
    } else {
      alert("Kindly enter number to run loop")
    }
  }

  const onTaskStartWithoutWebWorker = () => {
    if (number && /^[0-9]+$/.test(number)) {
      setIsWithWebWorker(false)
      setIsLoading(true)
      setResult(null)
      const processedData = [];
      for (let i = 0; i < number; i++) {
        let sum = 0;
        for (let j = 0; j < 100000; j++) {
          sum += Math.sqrt(j);
        }
        processedData.push({
          id: i,
          name: `User-${i}`,
          processedValue: Math.round(sum)
        });
      }
      setIsLoading(false)
      setResult(processedData)
    } else {
      alert("Kindly enter number to run loop")
    }
  }


  return (
    <div className="container">
      <h1 className='heading'>Web Worker</h1>
      <p className='text'>
        A Web Worker is a JavaScript script that runs in the background, separate from the main execution thread of the browser. It's used to perform intensive or long-running tasks without blocking the user interface, thus preventing the page from becoming unresponsive.
      </p>
      <div className='guideContainer'>
        <h3>To test the performance with and without a Web Worker:</h3>
        <ol>
          <li>First, enter a number in the input box — this is how many times you want the loop to run.</li>
          <li>Press any button above to start the test.</li>
          <li>Then, click any item from the user list.</li>
        </ol>
        <p>When you click a user item, its text should change.</p>
        <ul>
          <li>
            Without a Web Worker: A heavy loop runs on the main thread, so the browser is busy. This makes the text change slow or delayed.
          </li>
          <li>
            With a Web Worker: The heavy task runs in a separate thread, so the main thread stays free. This means the text changes immediately when you click.
          </li>
        </ul>
        <p>Web Workers help keep the UI smooth by moving heavy work off the main thread.</p>
      </div>
      <div className="inputContainer">
        <input type='number' value={number} placeholder='Enter Number' onChange={e => {
          setNumber(e.target.value)
          setResult(null)
          }} className='inputBox' />
      </div>
      <div className='btn-container'>
        <button className='btn' onClick={onTaskStart} disabled={isLoading}>
          {!isLoading ?
            <p className='text'>Start Intensive Task With Web Worker</p>
            : <Loader />
          }
        </button>
        <button className='btn' onClick={onTaskStartWithoutWebWorker}>
          <p className='text'>Start Intensive Task Without Web Worker</p>
        </button>
      </div>
      <div className='content'>
        <>
          {isWithWebWorker ? <h2 className="sub-heading">With Web Worker!</h2> : <h2 className="sub-heading">Without Web Worker</h2>}
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
        </>
      </div>
    </div>

  );
}

export default App;
