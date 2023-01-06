import React, { useState } from 'react';

import './App.css';

const App = () => {

  const [boards, setBoards] = useState([
    {id: 1, title: "Работа", items: [{id:1, title: 'Получить повышение'}, {id:2, title: 'Новые скиллы'}, {id:3, title: 'Изучить новые технологии'}]
    },
    {id: 2, title: "Хобби", items: [{id:4, title: 'Бегать по утрам'}, {id:5, title: 'Играть в футбол'}, {id:6, title: 'Читать книги'}]
    },
    {id: 3, title: "Выполнено", items: [{id:7, title: 'Бегать по утрам'}, {id:8, title: 'Играть в футбол'}, {id:9, title: 'Получить повышение'}]
    }
  ])

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null)


function dragOverHandler (e:any) {
  e.preventDefault()
  if(e.target.classname == "item") {
    e.target.style.boxShadow = "0 4px 3px gray"
  }
}
function dragLeaveHandler (e:any) {
  e.target.style.boxShadow = "none"
}
function dragStartHandler (e:any, board:any, item:any) {
  setCurrentBoard(board);
  setCurrentItem(item)
}
function dragEndHandler (e:any) {
  e.target.style.boxShadow = "none"

}
function dropHandler (e:any, board:any, item:any, currentBoard:any, currentItem:any) {
  e.preventDefault()
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)
  const dropIndex = board.items.indexOf(item)
  board.items.splice(dropIndex + 1, 0, currentItem)
  setBoards(boards.map( b => {
    if (b.id === board.id) {
      return board
    }
    if (b.id === currentBoard.id) {
      return currentBoard
    }
    return b
}))
}

function dropCardHandler (e:any, currentBoard: any, board:any) {
  if (board.items.length!=0)
            return;
  board.items.push(currentItem)
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map( b => {
      if (b.id === board.id) {
          return board
      }
      if (b.id === currentBoard.id) {
          return currentBoard
      }
        return b
  }))
}


  return (
    <div className="app">
      {boards.map(board => 
        <div 
          className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, currentBoard, board )}
              >

          <div className="board__title">{board.title}</div>
          {board.items.map(item => 
          <div 
            className="item" 
            draggable={true}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item, currentBoard, currentItem)}
          > 
            {item.title} 
          </div>)}
        </div>
        )}
        <div >
          <p className="test">GHdbtn</p>
        </div>
  </div>)
}

const VALID_STATUSES = new Set(['SUCCESS', 'FINAL', 'DONE'])

const people = [
  {name: 'Max', age:'20', status:'IN_PROGRESS'},
  {name: 'M', age:'22', status:'DONE'},
  {name: 'J', age:'24', status:'SUCCESS'},
]

const peopleWithValidStatus = people
      .filter(ger => VALID_STATUSES.has(ger.status))
      .map(ger => ger.name)

console.log(peopleWithValidStatus);



const meetups = [
  {name: 'Max', isActive: true, members: 100},
  {name: 'M', isActive: true, members: 900},
  {name: 'J', isActive: false, members: 600},
  {name: 'F', isActive: true, members: 500},
]

const memberOnActiveMeetups = (meetups:any) => meetups
        .filter(meetups => meetups.isActive)
        .reduce((sum, meetups) => sum + meetups.members, 0)

console.log(memberOnActiveMeetups(meetups)) 


const result = [5, 6, 7, 8, 9]
  let r1 = result.slice(1);
  
  r1.pop() ;
  r1.push(11)
  console.log(r1)

export default App;
