import React from 'react'

type Props = {
  // eslint-disable-next-line react/require-default-props
  percent?: number;
}

const Progress: React.FC<React.PropsWithChildren<Props>> = ({ percent = 0 }) => (
  <div>
    <div className='progress-pr'>
      <div
        className='progress-rate'
        style={{ width: `${percent}%` }}
      />
    </div>
    <span className='progress-num'>{(percent ?? 0).toString().substring(0, 4)}%</span>
  </div>
)

export default Progress
