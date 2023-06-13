// pages/index.js
import React from 'react';
import Head from 'next/head';
import LawyerChat from '../components/LawyerChat';
import styles from '../components/LawyerChat.module.css';

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Lawyer Chat</title>
        <link rel="stylesheet" href="https://unpkg.com/picnic" />
      </Head>
      <div className={styles.container}>
        <h1>Lawyer Chat</h1>
        <LawyerChat />
      </div>
    </div>
  );
};

export default IndexPage;