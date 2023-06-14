// pages/index.js
import React from 'react';
import Head from 'next/head';
import LawyerChat from '../components/LawyerChat';
import styles from './index.module.css';

const IndexPage = () => {
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>AI Lawyer</title>
        <link rel="stylesheet" href="https://unpkg.com/picnic" />
      </Head>
      <div className={styles.container}>
        <h1>AI Lawyer - Powered By OpenAI</h1>
        <LawyerChat />
      </div>
    </div>
  );
};

export default IndexPage;