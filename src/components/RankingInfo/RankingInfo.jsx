import React from 'react';
import styles from './RankingInfo.module.css';

export default function RankingInfo({ rankingData }) {
    console.log('Ranking data:', rankingData); // Debug log

    if (!rankingData) {
        return <div>No ranking data available.</div>;
    }

    return (
        <div className={styles.rankingContainer}>
            <h2>Student Ranking Information</h2>
            <p><strong>Student Name:</strong> {rankingData.studentName}</p>
            <p><strong>Application Date:</strong> {rankingData.applicationDate}</p>
            <p><strong>Status:</strong> {rankingData.status}</p>
        </div>
    );
}
