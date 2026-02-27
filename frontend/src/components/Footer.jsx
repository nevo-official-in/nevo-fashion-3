export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-10 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-red-600">Join the System</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="ENTER_EMAIL_ADDR" 
              className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-red-600 transition-colors"
            />
            <button className="absolute right-0 bottom-4 font-mono text-[10px] uppercase hover:text-red-600">Submit</button>
          </div>
        </div>
        
        <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
          <p className="text-white/40">Navigation</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-600 transition-colors">Shop All</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Archive</a></li>
          </ul>
        </div>

        <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
          <p className="text-white/40">Legal</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-600 transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between items-center opacity-20 font-mono text-[8px] uppercase tracking-[0.5em]">
        <span>© 2026 NEVO STUDIO // ALL RIGHTS RESERVED</span>
        <span>v2.0.4 STREET STAB</span>
      </div>
    </footer>
  );
};