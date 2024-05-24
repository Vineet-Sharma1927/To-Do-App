import { useState, useEffect } from "react";

function App() {

  const [Alltodos, setAlltodos] = useState([]);
  const [singletodo, setsingletodo] = useState({ title: "", desc: "" });

  function Addtodo() {
    if (!singletodo.title) {
      { alert("Entre the title...") }
      return
    }
    setAlltodos([...Alltodos, singletodo])
    addtodoLocalStorage([...Alltodos, singletodo])
  }

  function HandleDelete(i) {
    let newArr = [...Alltodos];
    newArr.splice(i, 1);
    addtodoLocalStorage(newArr);
    setAlltodos(newArr);
  }

  function addtodoLocalStorage(todo) {
    localStorage.setItem("todos", JSON.stringify(todo));
  }

  function gettodoLocalStorage() {
    let data = JSON.parse(localStorage.getItem('todos')) || [];
    setAlltodos(data);
  }

  useEffect(() => {
    gettodoLocalStorage();
  }, [])


  return (
    <>
      <div className=" w-[100vw] min-h-[100vh] bg-amber-100 text-center pt-3">

        <h1 className="font-bold text-3xl m-2 pb-3">To-Do App</h1>

        <input type="text" placeholder="Title" className=" border-2 p-2 rounded font-semibold " onChange={(e) =>
          setsingletodo((preValue) => ({
            ...preValue,     // This is used so thet the whole object created above place as it is and the title set to new value and desc remain the same 
            title: e.target.value
          }))
        } />
        <br />
        <br />
        <input type="text" placeholder="Description" className=" border-2 p-2 rounded font-semibold" onChange={(e) =>
          setsingletodo((preValue) => ({
            ...preValue,
            desc: e.target.value
          }))} />
        <br />
        <br />
        <button className=" border-2 p-4 rounded-xl border-black bg-slate-200" onClick={Addtodo}>Add To-Do</button>


        <div>
          {
            Alltodos.map((data, i) => (
              <div key={i} className=" p-3  mt-4 font-semibold border-black border-2 rounded-xl w-[95%] text-center m-auto flex justify-between items-center sm:w-[70%]">
                <h3 className="w-[15%]">{i + 1}</h3>
                <div className="flex flex-col w-[60%] bg-green-50 text-wrap p-[3px] rounded-2xl">
                  <h2 className="font-bold p-1 text-xl">{data.title}</h2>
                  <p className="text-wrap opacity-95">{data.desc}</p>
                </div>
                <button className="border-2 rounded-xl mt-3 font-bold p-1 border-black bg-blue-100 w-[13%]" onClick={() => HandleDelete(i)}><i className="fi fi-sr-trash"></i></button>  {/*we give the handel event in arrow function because we have to put index of the todo which we want to delete so we can not give it like HandleDelete(e) so we gave it in arrow function  */}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
