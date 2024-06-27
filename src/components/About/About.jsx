import React, { useEffect, useState } from 'react';
import styles from './About.module.css';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { importAllImages } from '../../utils/importDormitoryImages';

export default function About() {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const imageModules = importAllImages();
            const importedImages = await Promise.all(
                Object.keys(imageModules).map(async (path) => {
                    const module = await imageModules[path]();
                    return { src: module.default, path };
                })
            );
            setImages(importedImages);
        };
        loadImages();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const imageDescriptions = {
        'ob18.jpg': t('about.dorm18'),
        'ob13.jpg': t('about.dorm13')
    };

    return (
        <div className={styles.aboutContainer}>
            <section className={styles.infoSection}>
                <h2>{t('about.title')}</h2>
                <p>{t('about.paragraph1')}</p>
                <p>{t('about.paragraph2')}</p>
                <p>{t('about.paragraph3')}</p>
                <p>{t('about.paragraph4')}</p>
                <p>{t('about.paragraph5')}</p>
            </section>

            <section className={styles.imageSection}>
                <h2>{t('about.imagesTitle')}</h2>
                <Slider {...settings} className={styles.carousel}>
                    {images.map(({ src, path }) => (
                        <div key={path}>
                            <img src={src} alt={imageDescriptions[path.split('/').pop()] || t('about.dormImage')} className={styles.carouselImage} />
                            {/* <p className={styles.legend}>{imageDescriptions[path.split('/').pop()] || t('about.dormImage')}</p> */}
                        </div>
                    ))}
                </Slider>
            </section>
        </div>
    );
}
