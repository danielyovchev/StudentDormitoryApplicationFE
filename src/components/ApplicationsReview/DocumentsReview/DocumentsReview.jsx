import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../utils/routeConstants';
import styles from './DocumentsReview.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function DocumentsReview() {
    const { keycloak } = useAuth();
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const studentNumber = params.get('studentNumber');

    useEffect(() => {
        if (!keycloak.token || !studentNumber) {
            console.error('Missing token or studentNumber');
            return;
        }

        const fetchDocuments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/documents`, {
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
                setError(t('documentsReview.errorFetchingDocuments'));
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [keycloak.token, studentNumber, t]);

    const handleValidate = async (documentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/review/document/validate/${documentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.message) {
                // Remove the validated document from the list
                toast.success(data.message);
                setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId));
            } else {
                console.error('Validation failed:', data.message);
            }
        } catch (error) {
            console.error('Error validating document:', error);
        }
    };

    const renderFile = (fileUrl, fileName) => {
        if (!fileUrl || !fileName) {
            return <p>{t('documentsReview.noFileAvailable')}</p>;
        }

        const fileType = fileName.split('.').pop().toLowerCase();

        if (fileType === 'pdf') {
            return <embed src={fileUrl} width="100%" height="500px" type="application/pdf" />;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            return <img src={fileUrl} alt={fileName} className={styles.documentImage} />;
        } else {
            return <a href={fileUrl} download={fileName}>{fileName}</a>;
        }
    };

    if (loading) {
        return <div>{t('documentsReview.loading')}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{t('documentsReview.documentsReview')}</h2>
            {documents.length === 0 ? (
                <div>{t('documentsReview.noUnverifiedDocuments')}</div>
            ) : (
                <ul className={styles.documentList}>
                    {documents.map(document => (
                        <li key={document.id} className={styles.documentItem}>
                            <div className={styles.documentInfo}>
                                <p><strong>{t('documentsReview.documentId')}:</strong> {document.id}</p>
                                <p><strong>{t('documentsReview.studentName')}:</strong> {document.studentName || 'N/A'}</p>
                                <p><strong>{t('documentsReview.studentNumber')}:</strong> {document.studentNumber || 'N/A'}</p>
                                <p><strong>{t('documentsReview.category')}:</strong> {document.documentType || 'N/A'}</p>
                                <p><strong>{t('documentsReview.file')}:</strong></p>
                                {renderFile(document.fileUrl, document.fileName)}
                            </div>
                            <button onClick={() => handleValidate(document.id)} className={styles.validateButton}>{t('documentsReview.validate')}</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
