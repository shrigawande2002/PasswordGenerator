import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [charecter, setCharecter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState();

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charecter) str += "!@#$%^&*~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, charecter, number, setPassword])

  useEffect(() => { passwordGenerator() }, [length, charecter, number, passwordGenerator])

  const copyPassword = useRef(null)

  const copytoClipboard = useCallback(() => {
    copyPassword.current?.select();
    if (copyPassword) alert("copied")
    window.navigator.clipboard.writeText(password)


  }, [password])


  return (

    <>
      <div style={{ background: 'black', height: '100vh', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
        <div className='w-full h-48 max-w-md mx-auto mt-0 shadow-md rounded-lg px-4 my-8 text-white bg-gray-700 text-center'> <h1 className='py-4 text-2xl'>Password Generator</h1>
          <div className='flex overflow-hidden rounded-lg mb-4'>
            <input type="text"
              value={password}
              placeholder='Password'
              className='outline-none my-4 py-3 px-3 w-full bg-white text-orange-500 rounded-lg'
              readOnly
              ref={copyPassword}
            />
            {/* <button className=' bg-blue-700 outline-none text-white px-3 m-4 shrink-0 rounded-md' onClick={copytoClipboard}> Copy </button> */}
            <button><a className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl transition-transform duration-200 ease-in-out hover:scale-[1.02]" onClick={copytoClipboard}>
              copy
            </a></button>

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={15}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              /> <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={number}
                id='numberInput'
                onChange={() => { setNumber((prev) => !prev) }}
              /> <label> Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={charecter}
                id='numberInput'
                onChange={() => { setNumber((prev) => !prev) }}
              /> <label> Charecters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
