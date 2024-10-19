import React from 'react'
import styles from './base-layout.module.scss'
import Navbar from '../navbar/navbar';

interface BaseLayoutProps{
    children: JSX.Element;
}

const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <div className={styles.container}>
        <Navbar/>
        {props.children}
    </div>
  )
}

export default BaseLayout