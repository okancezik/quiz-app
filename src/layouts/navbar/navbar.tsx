import React from 'react'
import styles from './navbar.module.scss'
import PrimaryButton from '../../components/primary-button/primary-button'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div>
            <h3>QUIZ APP</h3>
        </div>
        <div>
            <PrimaryButton>Log In</PrimaryButton>
        </div>
    </div>
  )
}

export default Navbar