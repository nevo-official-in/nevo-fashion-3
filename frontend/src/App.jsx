import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
    Header,
    Footer,
    MenuDrawer,
    CartSidebar
} from './components';
import {
    HomePage,
    AccountPage,
    BagPage,
    FeaturedPage,
    CollectionPage,
    JournalPage,
    AboutPage,
    SearchPage
} from './page';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="bg-black min-h-screen w-full overflow-x-hidden">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <CartSidebar />
            
            <main className={`${isHomePage ? "pt-0" : "pt-24"} w-full`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/bag" element={<BagPage />} />
                    <Route path="/featured" element={<FeaturedPage />} />
                    <Route path="/collections" element={<CollectionPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </main>
            
            <Footer />
        </div>
    );
}

export default App;
