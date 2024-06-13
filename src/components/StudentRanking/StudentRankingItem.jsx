import React from 'react';
import styles from './StudentRankingItem.module.css';

export default function StudentRankingItem({ rank, name, score }) {
    return (
        <div className={styles.rankingRow}>
            <div className={styles.rankingColumn}>{rank}</div>
            <div className={styles.rankingColumn}>{name}</div>
            <div className={styles.rankingColumn}>{score}</div>
        </div>
    );
}
