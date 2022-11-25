import { useEffect, useState } from 'react'
import './AdminPage.css'
import axios from '../../api/axios'
import Header from '../../components/Header/Header'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const AdminPage = ({ socket }) => {
  const [onlineCount, setOnlineCount] = useState(0)
  const [newRegisterCount, setNewRegisterCount] = useState(0)
  const [askedQuestionCount, setAskedQuestionCount] = useState(0)
  const [openQuestionCount, setOpenQuestionCount] = useState(0)
  const [friendshipCount, setFriendshipCount] = useState(0)
  const [questionCountByCategory, setQuestionCountByCategory] = useState([])
  const [questionsInAWeek, setQuestionsInAWeek] = useState([])

  const doughnutData = {
    labels: questionCountByCategory.map((item) => item.category),
    datasets: [
      {
        label: '# of Posts',
        data: questionCountByCategory.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const barChartData = {
    labels: questionsInAWeek.map((item) => item.date).reverse(),
    datasets: [
      {
        data: questionsInAWeek.map((item) => item.count).reverse(),
        backgroundColor: ['#78e0da'],
        borderWidth: 0,
        barPercentage: 0.4,
      },
    ],
  }

  const getQuestionsInAWeek = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/admin/stats`,
      })
      console.log('WEEK questions: ', response.data)
      setQuestionsInAWeek(response.data.questionsInAWeek)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  useEffect(() => {
    // questions in a week
    getQuestionsInAWeek()

    socket.emit('refresh-dashboard')

    // 設 20 秒為區間向 server 發送事件
    const pollingTimer = setInterval(() => {
      socket.emit('refresh-dashboard')
    }, 20000)

    return () => clearInterval(pollingTimer)
  }, [])

  // online-count event
  socket.on('online-count', (count) => {
    console.log('online counts: ', count)
    setOnlineCount(count)
  })

  // refresh-dashboard-success
  socket.on('refresh-dashboard-success', (data) => {
    const {
      askedQuestionCount,
      openQuestionCount,
      questionCountByCategory,
      userCount,
      friendshipCount,
    } = data
    console.log('DATA: ', data)
    setAskedQuestionCount(askedQuestionCount)
    setOpenQuestionCount(openQuestionCount)
    setQuestionCountByCategory(questionCountByCategory)
    setNewRegisterCount(userCount)
    setFriendshipCount(friendshipCount)
  })

  return (
    <>
      <div className="dashboard-main-page-container">
        <Header socket={socket} />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <div className="bulletin-open-signal">
              <div className="signal-light"></div>
              <p>Bulletin Open</p>
            </div>
          </div>
          <div className="dashboard-upper-content">
            <div className="dashboard-upper-content-left">
              <div className="online-user">
                <p>Online Users</p>
                <span>{onlineCount}</span>
              </div>
              <div className="new-register">
                <p>New Register</p>
                <span>{newRegisterCount}</span>
              </div>
            </div>
            <div className="dashboard-upper-content-middle">
              <p>Page Views</p>
            </div>
            <div className="dashboard-upper-content-right">
              <p>Weekly Statistics</p>
              <Bar
                data={barChartData}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>
          </div>
          <div className="dashboard-lower-content">
            <div className="dashboard-lower-content-box">
              <p>Recent Matches</p>
              <div className="broadcast-box">
                <div>Haohao and Cleo matched !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
                <div>Haohao and Cleo become friends !</div>
              </div>
            </div>
            <div className="dashboard-lower-content-box">
              <div className="stat-item">
                <p>Asked Questions</p>
                <span>{askedQuestionCount}</span>
              </div>
              <div className="stat-item">
                <p>Open Questions</p>
                <span>{openQuestionCount}</span>
              </div>
              <div className="stat-item">
                <p>Total Replies</p>
                <span>22</span>
              </div>
              <div className="stat-item">
                <p>Recent Matches</p>
                <span>{friendshipCount}</span>
              </div>
            </div>
            <div className="dashboard-lower-content-box">
              <p>By Category</p>
              <Doughnut
                data={doughnutData}
                options={{
                  aspectRatio: 2 / 1,
                  cutoutPercentage: 100,
                  layout: { marginTop: 10 },
                  plugins: {
                    legend: {
                      position: 'right',
                      maxWidth: 200,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage
