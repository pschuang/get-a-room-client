import './AdminPage.css'
import Header from '../../components/Header/Header'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const AdminPage = ({ socket }) => {
  const data = {
    labels: ['movie', 'food', 'sport', 'politics', 'health', 'philosophy'],
    datasets: [
      {
        label: '# of Posts',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
                <span>1483</span>
              </div>
              <div className="new-register">
                <p>New Register</p>
                <span>1483</span>
              </div>
            </div>
            <div className="dashboard-upper-content-middle">
              <p>Page Views</p>
            </div>
            <div className="dashboard-upper-content-right">
              <p>Weekly Statistics</p>
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
                <span>168</span>
              </div>
              <div className="stat-item">
                <p>Open Questiones</p>
                <span>100</span>
              </div>
              <div className="stat-item">
                <p>Active Chat</p>
                <span>22</span>
              </div>
              <div className="stat-item">
                <p>Recent Matches</p>
                <span>13</span>
              </div>
            </div>
            <div className="dashboard-lower-content-box">
              <p>By Category</p>
              <Doughnut
                data={data}
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
