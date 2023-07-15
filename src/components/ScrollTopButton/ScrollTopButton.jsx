import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FiArrowUpCircle } from 'react-icons/fi';
import './scrollToButton.scss';

const ScrollTopButton = () => {
    const [ showButton, setShowButton ] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > window.innerHeight / 2) {
            setShowButton(true);
        } else {
            setShowButton(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            {showButton && (
                <button className='scroll-top-button' onClick={handleClick}>
                    <FiArrowUpCircle />
                </button>
            )}
        </>
    )
};

export default ScrollTopButton;