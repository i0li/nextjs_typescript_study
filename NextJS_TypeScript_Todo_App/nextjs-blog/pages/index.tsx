import { useState } from 'react'
import Image from 'next/image';
import styles from '../styles/Home.module.css'

export default function Home() {
    const [list, updateList] = useState([])
    const [doneList, updateDoneList] = useState([])
    const [todo, updateTodo] = useState('')
  
    // タスクを追加
    function addList():void {
        if(todo){
            updateList([...list, todo])
            updateTodo('')
        }
    }

    //完了配列に移動
    function addDoneList(index:number):void {
        var newList: string[] = [...list]
        var doneTodo = newList.splice(index, 1)
        updateList([...newList])
        updateDoneList([...doneList, doneTodo])
    }

    //完了配列より指定した要素を削除
    function deleteTodo(index:number):void {
        var newDoneList: string[] = [...doneList]
        newDoneList.splice(index, 1)
        updateDoneList(newDoneList)
    }

    //テキストエリアの値を保存
    const changeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo(e.target.value);
    }

    return (
      <div>
        <div className={`${styles.align_item_center} ${styles.height_100px}`}>
            <input className={`${styles.mx} ${styles.width_50} ${styles.text_form}`} type='text' name='todo' value={todo} onChange={(e) => changeTodoInput(e)}></input>
            <button className={`${styles.button} ${styles.mx}`} onClick={addList}>
                <Image 
                priority
                src="/images/plus_icon.png"
                className={styles.borderCircle}
                height={40}
                width={40}
                alt=""
                />
            </button>
        </div>
        <div>
        <div className={styles.flex}>
            <div className={`${styles.mx} ${styles.width_50}`}>
                <h2 className={styles.mx}>未完了</h2>
                <ul>
                    {list.map((todo, index) => {
                        return (
                            <div key={index}>
                                <li className={styles.flex}>
                                    <button className={`${styles.button} ${styles.mx}`} onClick={() => addDoneList(index)}>
                                    <Image 
                                    priority
                                    src="/images/done_icon.png"
                                    className={styles.borderCircle}
                                    height={30}
                                    width={30}
                                    alt=""
                                    />
                                    </button>
                                    <h3>{todo}</h3>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div className={`${styles.mx} ${styles.width_50}`}>
                <h2 className={styles.mx}>完了</h2>
                <ul>
                    {doneList.map((todo, index) => {
                        return (
                            <div key={index}>
                                <li className={styles.flex}>
                                    <button className={`${styles.button} ${styles.mx}`} onClick={() => deleteTodo(index)}>
                                    <Image 
                                    priority
                                    src="/images/cross_icon.png"
                                    className={styles.borderCircle}
                                    height={30}
                                    width={30}
                                    alt=""
                                    />
                                    </button>
                                    <h3>{todo}</h3>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
        </div>
        
      </div>
    )
  }