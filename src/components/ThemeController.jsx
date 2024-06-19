import React, { useEffect, useState } from 'react';

const themes = [
      "cupcake",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "valentine",
      "forest",
      "aqua",
      "pastel",
      "luxury",
      "dracula",
];

function ThemeController() {
  const [theme, setTheme] = useState('retro');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'retro');
    }
  }, []);

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
          </svg>
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
        {themes.map((themeName) => (
          <li key={themeName}>
            <input 
              type="radio" 
              name="theme-dropdown" 
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
              aria-label={themeName} 
              value={themeName} 
              checked={theme === themeName}
              onChange={handleThemeChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeController;
