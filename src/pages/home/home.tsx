import React from 'react'
import styles from './home.module.scss'
import PrimaryButton from '../../components/primary-button/primary-button'
import { Flex } from 'antd'
import { useAtom } from 'jotai'
import { loadingAtom } from '../../store/global-atoms'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [loading,] = useAtom(loadingAtom);
    const navigate = useNavigate();

  return (
    <Flex vertical className={styles.container}>
        <h1>Welcome To Quiz App</h1>
        <PrimaryButton loading={loading} onClick={()=>navigate('/quiz')}>Let's Start Now</PrimaryButton>
    </Flex>
  )
}

export default Home