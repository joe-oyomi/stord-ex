import React, { useCallback, useMemo } from "react";
import './stats.css'
import { useStats } from '../../data/stats';
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'

const Stats = () => {

  const { stats, offset, setOffset, limit, setLimit } = useStats()

  const formatTime = (date) => {
    const time = new Date(date);
    return time.toLocaleString()
  }

  const handleOffsetChange = useCallback((e) => {
    setOffset(parseInt(e.target.value))
  }, [setOffset])

  const handleLimitChange = useCallback((e) => {
    setLimit(parseInt(e.target.value))
  }, [setLimit])

  const headers = useMemo(() => [
    {label: 'Short Url', key: 'shorturl'},
    {label: 'Long Url', key: 'url'},
    {label: 'Times Visited', key: 'count'},
    {label: 'Time Created', key: 'createdat'},
    {label: 'Last visited', key: 'updatedat'}
  ], [])


  return(
    <div className="stats-container">
      <div className="table-options-container">
      <div className="download-button">
        <FontAwesomeIcon className="download-element" icon={faFileDownload} />
        <CSVLink className="download-caption" filename="shorturl" data={stats} headers={headers} >Export CSV</CSVLink>
      </div>
      <div className="offset-limit-container">
        <div>
          <span>offset</span>
          <input onChange={handleOffsetChange} min={0} value={offset} name="offset" type="number"/>
        </div>
        <div>
          <span>limit</span>
          <input onChange={handleLimitChange} min={1} value={limit} name="limit" type="number"/>
        </div>
      </div>
      </div>
      <table className="stats-table">
        <thead>
          <tr>
          <th>Short Url</th>
          <th>Times Visited</th>
          <th>Long Url</th>
          <th>Time Created</th>
          <th>Last Visited</th>
          </tr>
        </thead>
        <tbody>
        {
            stats && stats.map((entry) => 
            (
            <tr key={entry.shorturl}>
              <td>{entry.shorturl}</td>
              <td>{entry.count}</td>
              <td>{entry.url}</td>
              <td>{formatTime(entry.createdat)}</td>
              <td>{formatTime(entry.updatedat)}</td>
            </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default Stats;