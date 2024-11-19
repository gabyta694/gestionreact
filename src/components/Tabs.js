import React, { useState } from 'react';
import './Tabs.css'; 

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="tab-container">
                <div
                    className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab1')}
                >
                    Tab 1
                </div>
                <div
                    className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab2')}
                >
                    Tab 2
                </div>
                <div
                    className={`tab ${activeTab === 'tab3' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab3')}
                >
                    Tab 3
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'tab1' && <div>Contenido de Tab 1</div>}
                {activeTab === 'tab2' && <div>Contenido de Tab 2</div>}
                {activeTab === 'tab3' && <div>Contenido de Tab 3</div>}
            </div>
        </div>
    );
};

export default Tabs;
