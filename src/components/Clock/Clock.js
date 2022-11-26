import './Clock.css'
import { useState, useEffect, useRef } from 'react'
import axios from '../../api/axios'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const Clock = ({ socket }) => {
  const [closeTime, setCloseTime] = useState('')
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [remainingTime, setRemainingTime] = useState('')
  const timer = useRef(null)

  // 被選者答應加入聊天後開始倒數
  socket.on('match-end-time', (time) => {
    setIsCountingDown(true)
    setRemainingTime(dayjs(time).utc(true).local().diff(dayjs(), 'second'))
  })

  useEffect(() => {
    getTime()

    // 元件移除時清除倒數
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    // 開始倒數
    if (isCountingDown) {
      timer.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1)
      }, 1000)
    }
  }, [isCountingDown])

  useEffect(() => {
    // 若剩下時間小於 0 停止倒數
    if (remainingTime <= 0) {
      clearInterval(timer.current)
    }
  }, [remainingTime])

  const getTime = async () => {
    try {
      const response = await axios.get(`/common/time`)
      setCloseTime(
        dayjs(response.data.bulletinCloseTime).utc(true).local().format('HH:mm')
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="clock">
      {isCountingDown ? (
        <h3>{remainingTime}</h3>
      ) : (
        closeTime && (
          <>
            <p>Today bulletin's close time</p>
            <h3>{closeTime}</h3>
          </>
        )
      )}
    </div>
  )
}

export default Clock
