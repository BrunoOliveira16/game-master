import { useState, useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import './buttonTheme.scss';

const ButtonTheme = () => {
    const [ theme, setTheme ] = useState('dark-theme');

    const toggleTheme = () => {
        if(theme === 'light-theme') {
            setTheme('dark-theme');
        } else {
            setTheme('light-theme');
        }
    }

    useEffect(() => {
        document.documentElement.className= theme;
    }, [theme]);

    return (
        <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light-theme' ? <BsMoon /> : <BsSun />}
        </div>
    )
};

export default ButtonTheme;