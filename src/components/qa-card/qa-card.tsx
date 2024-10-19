import React from 'react'
import styles from './qa-card.module.scss'
import { Card, CardProps } from 'antd'


interface QACardProps extends CardProps {
  children: JSX.Element;
}

const QACard = (props: QACardProps) => {
  return (
    <Card {...props} >
      <div className={styles.container}>
        {props.children}
      </div>
    </Card>
  )
}

export default QACard