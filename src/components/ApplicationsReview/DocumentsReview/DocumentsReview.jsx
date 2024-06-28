import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../utils/routeConstants';
import styles from './DocumentsReview.module.css';
import { useAuth } from '../../../hooks/useAuth';

export default function DocumentsReview() {
    const { keycloak } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!keycloak.token) {
            console.error('Missing token');
            return;
        }

        const fetchDocuments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get/student/206206/documents`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch documents: ${response.statusText}`);
                }
                const data = await response.json();
                setDocuments(data.documents || []); // Ensure documents is always an array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching documents:', error);
                setError('Error fetching documents');
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [keycloak.token]);

    const handleValidate = async (documentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/documents/validate/${documentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                // Remove the validated document from the list
                setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId));
            } else {
                console.error('Validation failed:', data.message);
            }
        } catch (error) {
            console.error('Error validating document:', error);
        }
    };

    const renderFile = (file, fileName) => {
        if (!file || !fileName) {
            return <p>No file available</p>;
        }

        const fileType = fileName.split('.').pop().toLowerCase();
        const blob = new Blob([new Uint8Array(file)], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        if (fileType === 'pdf') {
            return <embed src={url} width="100%" height="500px" type="application/pdf" />;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            return <img src={url} alt={fileName} className={styles.documentImage} />;
        } else {
            return <a href={url} download={fileName}>{fileName}</a>;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Documents Review</h2>
            {documents.length === 0 ? (
                <div>No unverified documents.</div>
            ) : (
                <ul className={styles.documentList}>
                    {documents.map(document => (
                        <li key={document.id} className={styles.documentItem}>
                            <div className={styles.documentInfo}>
                                <p><strong>Document ID:</strong> {document.id}</p>
                                <p><strong>Student Name:</strong> {document.studentName || 'N/A'}</p>
                                <p><strong>Student Number:</strong> {document.studentNumber || 'N/A'}</p>
                                <p><strong>Category:</strong> {document.documentType || 'N/A'}</p>
                                <p><strong>File:</strong></p>
                                {renderFile(document.file, document.fileName)}
                            </div>
                            <button onClick={() => handleValidate(document.id)} className={styles.validateButton}>Validate</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
